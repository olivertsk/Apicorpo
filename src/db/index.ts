/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Sequelize } from 'sequelize'
import { type ModelStatic, isAssociatable } from '../types/SequelizeTypes'
import config from '../config/config'
import AppConfig from '../config/AppConfig'
import { fxUserFactory } from '@users/userModel'
import { fxRolFactory } from '@users/rolModel'
import { fxViewFactory } from '@entities/views/viewModel'
// import { fxPermissionFactory } from '@entities/permissions/permissionModel'
import { fxDepartmentFactory } from '@entities/departments/departmentModel'
import { fxCategoryFactory } from '@entities/categories/categoryModel'
import { fxProductFactory } from '@products/productModel'
import { fxProductImageFactory } from '@products/productImagesModel'
import { fxBannerFactory } from '@entities/banners/bannerModel'
import { fxMapFactory } from '@entities/maps/mapModel'
import { fxFavoriteProductFactory } from '@products/favoriteProductModel'
import { fxOrdersFactory } from '@entities/orders/orderModel'
import { fxOrderProductFactory } from '@entities/orders/orderProductModel'
import { fxPasswordResetFactory } from '@users/passwordResetModel'
import { fxBulkUploadLogFactory } from '@entities/integration/BulkUploadLog'
import { fxPaymentMethodFactory } from '@entities/paymentMethods/paymentMethodModel'
import { fxNotificationFactory } from '@entities/notification/notificationModel'
import { fxSurveyFactory } from '@entities/surveys/surveyModel'
import { fxSurveyQuestionFactory } from '@entities/surveyQuestions/surveyQuestionModel'
import { fxSurveyAnswerOptionFactory } from '@entities/surveyAnswerOptions/surveyAnswerOptionModel'
import { fxSurveyUserFactory } from '@entities/surveyUsers/surveyUserModel'
import { fxSurveyResponseFactory } from '@entities/surveyResponses/surveyResponseModel'
import { fxSuggestionFactory } from '@entities/suggestions/suggestionModel'
import { fxChatQuestionFactory } from '@entities/chat/chatQuestionModel'
import { fxChatAnswerFactory } from '@entities/chat/ChatAnswerModel'
import { fxConversationFactory } from '@entities/conversations/conversationModel'
import { fxConversationMessageFactory } from '@entities/conversations/conversationMessageModel'
import { fxPermissionFactory } from '@entities/permissions/permissionModel'
// @ts-ignore
const database = config[AppConfig.NODE_ENV] || config.development

const sequelize = new Sequelize(database.database, database.username, database.password, {
  ...database,
  logging: false,
  dialect: database?.dialect || 'mysql',
})

export const modelUser = fxUserFactory(sequelize)
export const modelRol = fxRolFactory(sequelize)
export const modelView = fxViewFactory(sequelize)
export const modelDepartment = fxDepartmentFactory(sequelize)
export const modelCategory = fxCategoryFactory(sequelize)
export const modelProduct = fxProductFactory(sequelize)
export const modelProductImages = fxProductImageFactory(sequelize)
export const modelBanner = fxBannerFactory(sequelize)
export const modelMap = fxMapFactory(sequelize)
export const modelFavoriteProduct = fxFavoriteProductFactory(sequelize)
// export const modelPermission = fxPermissionFactory(sequelize)
export const modelOrder = fxOrdersFactory(sequelize)
export const modelOrderProducto = fxOrderProductFactory(sequelize)
export const modelPasswordReset = fxPasswordResetFactory(sequelize)
export const modelBulkUploadLog = fxBulkUploadLogFactory(sequelize)
export const modelPaymentMethod = fxPaymentMethodFactory(sequelize)
export const modelNotification = fxNotificationFactory(sequelize)
export const modelSurvey = fxSurveyFactory(sequelize)
export const modelSurveyQuestion = fxSurveyQuestionFactory(sequelize)
export const modelSurveyAnswerOption = fxSurveyAnswerOptionFactory(sequelize)
export const modelSurveyUser = fxSurveyUserFactory(sequelize)
export const modelSurveyResponse = fxSurveyResponseFactory(sequelize)
export const modelSuggestion = fxSuggestionFactory(sequelize)
export const modelChatQuestion = fxChatQuestionFactory(sequelize)
export const modelChatAnswer = fxChatAnswerFactory(sequelize)
export const modelConversation = fxConversationFactory(sequelize)
export const modelConversationMessage = fxConversationMessageFactory(sequelize)
export const modelPermission = fxPermissionFactory(sequelize)

const models = {
  modelUser,
  modelRol,
  modelView,
  modelCategory,
  modelDepartment,
  modelProduct,
  modelProductImages,
  modelBanner,
  modelMap,
  modelFavoriteProduct,
  modelOrder,
  modelOrderProducto,
  modelPasswordReset,
  modelBulkUploadLog,
  modelPaymentMethod,
  modelNotification,
  modelSurvey,
  modelSurveyQuestion,
  modelSurveyAnswerOption,
  modelSurveyUser,
  modelSurveyResponse,
  modelSuggestion,
  modelChatQuestion,
  modelChatAnswer,
  modelConversation,
  modelConversationMessage,
  modelPermission,
}

export type ModelRegistry = typeof models
export type ModelRegistryKeys = keyof typeof models

Object.values(models).forEach((model: ModelStatic<any>) => {
  if (isAssociatable<ModelRegistry>(model)) {
    model.associate(models)
  }
})

export default sequelize
