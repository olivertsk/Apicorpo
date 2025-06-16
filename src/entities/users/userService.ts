import { modelPasswordReset, modelRol, modelUser } from '@db/index'
import { type FindOptions, ValidationErrorItem, ValidationError, Op } from 'sequelize'
import type {
  IUserAttributes,
  IUserCreationAttributes,
  IResponseAllUser,
  IUserInstance,
  IUserUpdatenAttributes,
  IAuthUserUpdatenAttributes,
  IAuthGoogle,
} from '@users/userModel'
import { fxOrderNameId, fxPaginate, fxReponseServices } from '../../utils/query'
import { fxI18n } from '@utils/i18n'
import type {
  IPasswordResetAttributes,
  IPasswordResetCreationAttributes,
} from './passwordResetModel'
import type { IRolAttributes } from './rolModel'

class UsersService {
  async validate(data: any, userId: string | null = null) {
    const fieldsToCheck = ['email']
    for (const field of fieldsToCheck) {
      if (data[field]) {
        const whereStatement = {
          where: { [field]: data[field] },
        }
        if (userId) {
          whereStatement.where = {
            ...whereStatement.where,
            id: { [Op.not]: userId },
          }
        }
        const existingUser = await modelUser.findOne(whereStatement)
        if (existingUser) {
          const fielTanslate = fxI18n.__(field)
          const errorItems = [
            new ValidationErrorItem(
              fxI18n.__('the') + ' ' + fielTanslate + ' ' + fxI18n.__('already_in_use'),
              'unique violation', // type
              field, // path
              data[field], // value
              existingUser,
              'notUnique', // validatorKey
              'validate',
              []
            ),
          ]
          throw new ValidationError('Validation error', errorItems)
        }
      }
    }
    const dataValidate = modelUser.build(data)
    await dataValidate.validate()
  }

  public async get(id: string): Promise<IUserAttributes | null> {
    try {
      const vResponse: IUserAttributes | null = await modelUser.findOne({
        where: {
          id,
        },
        include: [
          {
            model: modelRol,
            as: 'rol',
          },
        ],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  // email: requestBody?.email || `${requestBody.uid.slice(0, 3)}@private.com`,
  // name: requestBody?.name || '',
  // uid: requestBody.uid,
  // avatar: requestBody?.avatar || '',
  public async loginOrRegisterGoogle({
    email,
    name,
    uid,
    avatar,
  }: IAuthGoogle): Promise<IUserAttributes | null> {
    try {
      const vResponse: IUserInstance | null = await modelUser.findOne({
        where: {
          email,
        },
        include: [
          {
            model: modelRol,
            as: 'rol',
          },
        ],
      })
      if (vResponse) {
        await vResponse.update({
          name: name || vResponse?.name || '',
          uid: uid || vResponse?.uid || '',
          avatar: avatar || vResponse?.avatar || '',
        })
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  public async getRol(id: string): Promise<IUserAttributes | null> {
    try {
      const vResponse: IUserAttributes | null = await modelUser.findOne({
        where: {
          id,
        },
        include: [
          {
            model: modelRol,
            as: 'rol',
            required: false,
          },
        ],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async showRolName(name: string): Promise<IRolAttributes | null> {
    try {
      const vResponse: IRolAttributes | null = await modelRol.findOne({
        where: {
          name,
        },
        include: [
          {
            model: modelUser,
            as: 'users',
            attributes: ['id', 'name', 'tokenPush'],
          },
        ],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllUser> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      if (pParam?.name) {
        whereStatement.where = {
          ...whereStatement.where,
          [Op.or]: {
            dni: {
              [Op.like]: `%${pParam.name}%`,
            },
            email: {
              [Op.like]: `%${pParam.name}%`,
            },
            name: {
              [Op.like]: `%${pParam.name}%`,
            },
          },
        }
      }
      whereStatement.include = [
        {
          model: modelRol,
          as: 'rol',
        },
      ]
      if (pParam.role) {
        whereStatement.where = {
          ...whereStatement.where,
          rolId: pParam.role,
        }
      }
      const vResponse: IUserAttributes[] = await modelUser.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllUser = await fxReponseServices(
          pParam,
          whereStatement,
          modelUser.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(userCreationParams: IUserCreationAttributes): Promise<IUserAttributes> {
    try {
      if (!userCreationParams?.rolId) {
        const rol = await modelRol.findOne({
          where: {
            name: 'client',
          },
        })
        if (rol) {
          userCreationParams.rolId = rol.id
        }
      }
      const vResponse: IUserAttributes = await modelUser.create(userCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    userCreationParams: IUserUpdatenAttributes | IAuthUserUpdatenAttributes,
    id: string
  ): Promise<IUserAttributes | null> {
    try {
      if (id) {
        const vResponse: IUserInstance | null = await modelUser.findOne({
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt', 'status', 'rol'],
          },
          where: {
            id: id,
          },
          include: [
            {
              model: modelRol,
              as: 'rol',
            },
          ],
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(userCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async updateRol(rolId: IRolAttributes['id'], id: string): Promise<boolean> {
    try {
      if (id) {
        const vResponse: IUserInstance | null = await modelUser.findOne({
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt', 'status', 'rol'],
          },
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return false
        }
        vResponse.rolId = rolId
        await vResponse.save()
        return true
      }
      return false
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async updateTokenPush(
    tokenPush: IUserAttributes['tokenPush'],
    id: string
  ): Promise<IUserAttributes | null> {
    try {
      if (id) {
        const vResponse: IUserInstance | null = await modelUser.findOne({
          attributes: ['id', 'tokenPush'],
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update({
          tokenPush,
        })
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  public async updateToken(tokenPush: string, id: string): Promise<IUserAttributes | null> {
    try {
      if (id) {
        const vResponse: IUserInstance | null = await modelUser.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update({
          tokenPush,
        })
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  public async updatePassword(
    userCreationParams: { password: string },
    id: string
  ): Promise<IUserAttributes | null> {
    try {
      if (id) {
        const vResponse: IUserInstance | null = await modelUser.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(userCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  public async login(pEmail: string): Promise<IUserAttributes | null> {
    try {
      const vUser: IUserAttributes | null = await modelUser.scope('withPassword').findOne({
        where: { email: pEmail },
        include: [
          {
            model: modelRol,
            as: 'rol',
          },
        ],
      })
      return vUser
    } catch (error) {
      throw error
    }
  }

  public async getUserWithPassword(pId: string): Promise<IUserAttributes | null> {
    try {
      const vUser: IUserAttributes | null = await modelUser.scope('withPassword').findOne({
        where: { id: pId },
      })
      return vUser
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      console.log('pId :>> ', pId)
      const record = await modelUser.update(
        { deletedAt: new Date() },
        {
          where: { id: pId },
        }
      )
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async createPasswordReset(
    itemCreationParams: IPasswordResetAttributes
  ): Promise<IPasswordResetCreationAttributes> {
    try {
      await modelPasswordReset.destroy({ where: { email: itemCreationParams.email } })
      const vResponse: IPasswordResetAttributes =
        await modelPasswordReset.create(itemCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async getPasswordReset(code: string): Promise<string | null> {
    try {
      const vResponse: IPasswordResetAttributes | null = await modelPasswordReset.findOne({
        where: { code },
      })
      if (vResponse) {
        const email = vResponse.email
        await modelPasswordReset.destroy({ where: { code } })
        return email
      } else {
        return null
      }
    } catch (error) {
      throw error
    }
  }
}
export default new UsersService()
