/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FileController } from './../file/fileController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ViewsController } from './../entities/views/viewController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../entities/users/userController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RolsController } from './../entities/users/rolController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../entities/users/authController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SurveysController } from './../entities/surveys/surveyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SurveyResponsesController } from './../entities/surveyResponses/surveyResponseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SurveyQuestionsController } from './../entities/surveyQuestions/surveyQuestionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SurveyAnswerOptionsController } from './../entities/surveyAnswerOptions/surveyAnswerOptionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SuggestionsController } from './../entities/suggestions/suggestionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductReviewController } from './../entities/products/productReviewController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductsController } from './../entities/products/productController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductCommentController } from './../entities/products/productCommentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FavoriteProductsController } from './../entities/products/favoriteProductController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostsController } from './../entities/posts/postController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PermissionsController } from './../entities/permissions/permissionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentMethodsController } from './../entities/paymentMethods/paymentMethodController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrdersController } from './../entities/orders/orderController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { notificationController } from './../entities/notification/NotificationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MapsController } from './../entities/maps/mapController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { A2IntegrationController } from './../entities/integration/A2IntegrationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DepartmentsController } from './../entities/departments/departmentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExchangeController } from './../entities/currencies/exchangeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrenciesController } from './../entities/currencies/currencyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConversationsController } from './../entities/conversations/conversationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ChatQuestionsController } from './../entities/chat/chatQuestionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriesController } from './../entities/categories/categoryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BannersController } from './../entities/banners/bannerController';
import { expressAuthentication } from './../middlewares/authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');


const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "FileType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["products"]},{"dataType":"enum","enums":["departments"]},{"dataType":"enum","enums":["categories"]},{"dataType":"enum","enums":["banners"]},{"dataType":"enum","enums":["maps"]},{"dataType":"enum","enums":[null]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IViewAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "icon": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"string","required":true},
            "route": {"dataType":"string"},
            "url": {"dataType":"string"},
            "order": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllView": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IViewAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IViewFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IViewAttributes.route-or-url-or-name_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"route":{"dataType":"string"},"url":{"dataType":"string"},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IViewCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IViewAttributes.route-or-url-or-name_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"order":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"icon":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"id":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "lastName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "email": {"dataType":"string","required":true},
            "avatar": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "dni": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "dniType": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "phoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "dob": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "password": {"dataType":"string","required":true},
            "rolId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "status": {"dataType":"boolean"},
            "location": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "tokenPush": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "receiveNotification": {"dataType":"boolean"},
            "gender": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "state": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "city": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "zone": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "uid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllUser": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IUserAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "role": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IUserAttributes.uid__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"uid":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IUserAttributes.id-or-email-or-password_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"email":{"dataType":"string","required":true},"password":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IUserAttributes.name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"Partial_Pick_IUserAttributes.uid__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"recaptchaToken":{"dataType":"string"},"password":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"passwordConfirmation":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"rolId":{"dataType":"string"},"name":{"dataType":"string"},"avatar":{"dataType":"string"},"email":{"dataType":"string"}}}]},{"dataType":"intersection","subSchemas":[{"ref":"Pick_IUserAttributes.id-or-email-or-password_"},{"ref":"Partial_Pick_IUserAttributes.name__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"recaptchaToken":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"idToken":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"zone":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"city":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"state":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"gender":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dob":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"receiveNotification":{"dataType":"boolean"},"rolId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"location":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"avatar":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"passwordConfirmation":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}}]},{"dataType":"nestedObjectLiteral","nestedProperties":{"recaptchaToken":{"dataType":"string"},"rolId":{"dataType":"string"},"idToken":{"dataType":"string","required":true},"licenseNumber":{"dataType":"string"},"healthCenter":{"dataType":"string"},"avatar":{"dataType":"string"},"passwordConfirmation":{"dataType":"string"},"password":{"dataType":"string"},"email":{"dataType":"string"},"name":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IUserAttributes.id-or-rolId_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"rolId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IUserAttributes.Exclude_keyofIUserAttributes.password__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"uid":{"dataType":"string"},"id":{"dataType":"string"},"email":{"dataType":"string","required":true},"rolId":{"dataType":"string","required":true},"lastName":{"dataType":"string"},"avatar":{"dataType":"string"},"dni":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},"dniType":{"dataType":"string"},"phoneNumber":{"dataType":"string"},"dob":{"dataType":"string"},"status":{"dataType":"boolean"},"location":{"dataType":"string"},"tokenPush":{"dataType":"string"},"receiveNotification":{"dataType":"boolean"},"gender":{"dataType":"string"},"state":{"dataType":"string"},"city":{"dataType":"string"},"zone":{"dataType":"string"},"createdAt":{"dataType":"datetime"},"updatedAt":{"dataType":"datetime"},"deletedAt":{"dataType":"datetime"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IUserAttributes.password_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IUserAttributes.Exclude_keyofIUserAttributes.password__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserUpdatenAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IUserAttributes.id-or-rolId_"},{"ref":"Omit_IUserAttributes.password_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"zone":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"city":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"state":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"gender":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dob":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"receiveNotification":{"dataType":"boolean"},"phoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dniType":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dni":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"lastName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"location":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"avatar":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRolAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllRol": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IRolAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRolFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IRolAttributes.id-or-name_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IPermissionAttributes.id-or-rolId-or-viewId_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"rolId":{"dataType":"string"},"viewId":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPermissionCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IPermissionAttributes.id-or-rolId-or-viewId_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"delete":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[false]}]},"put":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[false]}]},"post":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[false]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRolCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IRolAttributes.id-or-name_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"permissions":{"dataType":"array","array":{"dataType":"refAlias","ref":"IPermissionCreationAttributes"}}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAuthUserUpdatenAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"zone":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"city":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"state":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"gender":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"tokenPush":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"name":{"dataType":"string","required":true},"dob":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"receiveNotification":{"dataType":"boolean"},"phoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dniType":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dni":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"lastName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"location":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"avatar":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPasswordRecovery": {
        "dataType": "refObject",
        "properties": {
            "passwordConfirmation": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESurveyType": {
        "dataType": "refEnum",
        "enums": ["firstPurchase","register"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "type": {"dataType":"union","subSchemas":[{"ref":"ESurveyType"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllSurvey": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ISurveyAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "title": {"dataType":"string"},
            "order": {"dataType":"string"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "leftSurveyParams": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"string","required":true},
            "userId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ISurveyAttributes.title-or-description_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true},"description":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_ISurveyAttributes.title-or-description_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"updatedAt":{"dataType":"datetime"},"createdAt":{"dataType":"datetime"},"type":{"dataType":"union","subSchemas":[{"ref":"ESurveyType"},{"dataType":"enum","enums":[null]}]},"id":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyUserAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "surveyId": {"dataType":"string"},
            "date": {"dataType":"string"},
            "name": {"dataType":"string"},
            "lastname": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllSurveyUser": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ISurveyUserAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyResponseFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "title": {"dataType":"string"},
            "order": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyResponseAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "surveyId": {"dataType":"string","required":true},
            "questionId": {"dataType":"string","required":true},
            "answerOptionId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "text": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "surveyUserId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyResponseCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"responses":{"dataType":"array","array":{"dataType":"refObject","ref":"ISurveyResponseAttributes"},"required":true},"surveyUserId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"surveyId":{"dataType":"string"},"surveyUrl":{"dataType":"string"},"date":{"dataType":"string"},"calendlyUri":{"dataType":"string"},"phoneCode":{"dataType":"string"},"phone":{"dataType":"string"},"email":{"dataType":"string"},"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyUserUpdateAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "surveyId": {"dataType":"string"},
            "calendlyUri": {"dataType":"string"},
            "date": {"dataType":"string"},
            "name": {"dataType":"string"},
            "lastname": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
            "day": {"dataType":"string"},
            "timeCall": {"dataType":"string"},
            "surveyUrl": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESurveyQuestionType": {
        "dataType": "refEnum",
        "enums": ["selection","text"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyQuestionAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "text": {"dataType":"string"},
            "type": {"ref":"ESurveyQuestionType"},
            "order": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[0]}]},
            "surveyId": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllSurveyQuestion": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ISurveyQuestionAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyQuestionFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "text": {"dataType":"string"},
            "order": {"dataType":"string"},
            "type": {"ref":"ESurveyQuestionType"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ISurveyQuestionAttributes.text_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"text":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyQuestionCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_ISurveyQuestionAttributes.text_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"updatedAt":{"dataType":"datetime"},"createdAt":{"dataType":"datetime"},"order":{"dataType":"double"},"surveyId":{"dataType":"string"},"type":{"dataType":"string"},"id":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyQuestionUpdateAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_ISurveyQuestionAttributes.text_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"updatedAt":{"dataType":"datetime"},"createdAt":{"dataType":"datetime"},"order":{"dataType":"double"},"surveyId":{"dataType":"string"},"type":{"ref":"ESurveyQuestionType"},"id":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESurveyAnswerOptionType": {
        "dataType": "refEnum",
        "enums": ["selection","text"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyAnswerOptionAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "questionId": {"dataType":"string"},
            "text": {"dataType":"string"},
            "order": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "type": {"dataType":"union","subSchemas":[{"ref":"ESurveyAnswerOptionType"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllSurveyAnswerOption": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ISurveyAnswerOptionAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyAnswerOptionFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "title": {"dataType":"string"},
            "order": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ISurveyAnswerOptionAttributes.text-or-questionId_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"text":{"dataType":"string"},"questionId":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISurveyAnswerOptionCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_ISurveyAnswerOptionAttributes.text-or-questionId_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"updatedAt":{"dataType":"datetime"},"createdAt":{"dataType":"datetime"},"type":{"dataType":"union","subSchemas":[{"ref":"ESurveyAnswerOptionType"},{"dataType":"enum","enums":[null]}]},"order":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},"id":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESuggestionStatus": {
        "dataType": "refEnum",
        "enums": [0,1,2,3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESuggestionPriority": {
        "dataType": "refEnum",
        "enums": [0,1,2,3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISuggestionAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"ref":"ESuggestionStatus"},{"dataType":"enum","enums":[null]}]},
            "priority": {"dataType":"union","subSchemas":[{"ref":"ESuggestionPriority"},{"dataType":"enum","enums":[null]}]},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "assignedTo": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "response": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "responseDate": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllSuggestion": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ISuggestionAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISuggestionFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "title": {"dataType":"string"},
            "order": {"dataType":"string"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ISuggestionAttributes.title-or-description_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true},"description":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISuggestionCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_ISuggestionAttributes.title-or-description_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"responseDate":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"response":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"assignedTo":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"userId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"priority":{"dataType":"union","subSchemas":[{"ref":"ESuggestionPriority"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"ref":"ESuggestionStatus"},{"dataType":"enum","enums":[null]}]},"type":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"id":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductReviewAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "productId": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "rating": {"dataType":"double","required":true},
            "comment": {"dataType":"string"},
            "isApproved": {"dataType":"boolean"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllProductReview": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IProductReviewAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductReviewFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "productId": {"dataType":"string"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
            "isClient": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IProductReviewAttributes.Exclude_keyofIProductReviewAttributes.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"datetime"},"updatedAt":{"dataType":"datetime"},"productId":{"dataType":"string"},"userId":{"dataType":"string"},"rating":{"dataType":"double","required":true},"comment":{"dataType":"string"},"isApproved":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IProductReviewAttributes.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IProductReviewAttributes.Exclude_keyofIProductReviewAttributes.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductReviewCreationAttributes": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_IProductReviewAttributes.id_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
            "departmentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "categoryId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"boolean"},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "longDescription": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "price": {"dataType":"double","required":true},
            "promotionalPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "priceWithTax": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "priceBs": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "promotionalPriceBs": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "priceWithTaxBs": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "stock": {"dataType":"double","required":true},
            "brand": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "taxRate": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "model": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "unit": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "coverImage": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "idn": {"dataType":"double"},
            "views": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "reviewCount": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            "averageRating": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllProduct": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IProductAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "search": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "departmentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "departmentIds": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "categoryId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "categoriesIds": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "minPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "maxPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "order": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["maxPrice"]},{"dataType":"enum","enums":["minPrice"]},{"dataType":"enum","enums":["betterRating"]},{"dataType":"enum","enums":["worseRating"]}]},
            "typeSearch": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isClient": {"dataType":"boolean"},
            "typePrice": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["price"]},{"dataType":"enum","enums":["priceBs"]}]},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "model": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "unit": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IProductAttributes.id-or-departmentId-or-categoryId-or-description_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"description":{"dataType":"string"},"departmentId":{"dataType":"string"},"categoryId":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IProductAttributes.name-or-code-or-price-or-priceWithTax__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"code":{"dataType":"string"},"price":{"dataType":"double"},"priceWithTax":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IProductImageAttributes.id-or-isVideo_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"isVideo":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IProductImageAttributes.file-or-productId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"productId":{"dataType":"string"},"file":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductImageCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IProductImageAttributes.id-or-isVideo_"},{"ref":"Partial_Pick_IProductImageAttributes.file-or-productId__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"alt":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"position":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[0]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IProductAttributes.id-or-departmentId-or-categoryId-or-description_"},{"ref":"Partial_Pick_IProductAttributes.name-or-code-or-price-or-priceWithTax__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"averageRating":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},"reviewCount":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},"unit":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"model":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"views":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"priceWithTaxBs":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"promotionalPriceBs":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"priceBs":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"images":{"dataType":"array","array":{"dataType":"refAlias","ref":"IProductImageCreationAttributes"}},"coverImage":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"longDescription":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"taxRate":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"brand":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"stock":{"dataType":"double"},"promotionalPrice":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCommentAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "productId": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "parentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "content": {"dataType":"string","required":true},
            "isApproved": {"dataType":"boolean"},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllProductComment": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IProductCommentAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCommentFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "productId": {"dataType":"string"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
            "isClient": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IProductCommentAttributes.Exclude_keyofIProductCommentAttributes.id-or-parentId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"datetime"},"updatedAt":{"dataType":"datetime"},"deletedAt":{"dataType":"datetime"},"productId":{"dataType":"string"},"userId":{"dataType":"string"},"isApproved":{"dataType":"boolean"},"content":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IProductCommentAttributes.id-or-parentId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IProductCommentAttributes.Exclude_keyofIProductCommentAttributes.id-or-parentId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCommentCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Omit_IProductCommentAttributes.id-or-parentId_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"parentId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFavoriteProductAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "productId": {"dataType":"string","required":true},
            "userId": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllFavoriteProduct": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IFavoriteProductAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFavoriteProductFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isClient": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IFavoriteProductAttributes.productId_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"productId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IFavoriteProductAttributes.id-or-userId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"userId":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFavoriteProductCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IFavoriteProductAttributes.productId_"},{"ref":"Partial_Pick_IFavoriteProductAttributes.id-or-userId__"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPostAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "excerpt": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "coverImage": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["article"]},{"dataType":"enum","enums":["recipe"]}],"required":true},
            "metaTitle": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "metaDescription": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"boolean","required":true},
            "authorId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllPost": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IPostAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPostFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "isClient": {"dataType":"boolean"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
            "title": {"dataType":"string"},
            "type": {"dataType":"string"},
            "typeSearch": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IPostAttributes.id_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPostCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IPostAttributes.id_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"enum","enums":[null]},"authorId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"boolean","required":true},"metaDescription":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"metaTitle":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["article"]},{"dataType":"enum","enums":["recipe"]}],"required":true},"coverImage":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"excerpt":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"content":{"dataType":"string","required":true},"slug":{"dataType":"string","required":true},"title":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPermissionAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "rolId": {"dataType":"string"},
            "viewId": {"dataType":"string"},
            "post": {"dataType":"boolean","required":true},
            "put": {"dataType":"boolean","required":true},
            "delete": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllPermission": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IPermissionAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPermissionFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ETypePaymentMethods": {
        "dataType": "refEnum",
        "enums": ["cash","bank","zelle","pago movil","binance"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentMethodAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "type": {"ref":"ETypePaymentMethods","required":true},
            "name": {"dataType":"string","required":true},
            "dni": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "numberAccount": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "phoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "accountType": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "currency": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true},
            "imageInfo": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllPaymentMethod": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IPaymentMethodAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentMethodFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "type": {"ref":"ETypePaymentMethods"},
            "isClient": {"dataType":"boolean"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IPaymentMethodAttributes.id_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IPaymentMethodAttributes.name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ETypePaymentMethods.Cash": {
        "dataType": "refEnum",
        "enums": ["cash"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentMethodCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IPaymentMethodAttributes.id_"},{"ref":"Partial_Pick_IPaymentMethodAttributes.name__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"imageInfo":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"currency":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"phoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"type":{"dataType":"union","subSchemas":[{"ref":"ETypePaymentMethods"},{"ref":"ETypePaymentMethods.Cash"}],"required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true},"accountType":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"numberAccount":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"email":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"dni":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EStatusOrder": {
        "dataType": "refEnum",
        "enums": ["pending","process","approve","decline"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EWasSent": {
        "dataType": "refEnum",
        "enums": [0,1,2],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "userId": {"dataType":"string","required":true},
            "dni": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}],"required":true},
            "dniType": {"dataType":"string","required":true},
            "nameClient": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "observation": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "date": {"dataType":"string","required":true},
            "amount": {"dataType":"double","required":true},
            "amountWithoutTax": {"dataType":"double","required":true},
            "valueTax": {"dataType":"double","required":true},
            "location": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"ref":"EStatusOrder"},{"dataType":"enum","enums":[null]}]},
            "adminId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "updatedStatus": {"dataType":"string","required":true},
            "reason": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "wasSent": {"ref":"EWasSent"},
            "reference": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "typePayment": {"dataType":"union","subSchemas":[{"ref":"ETypePaymentMethods"},{"dataType":"enum","enums":[null]}]},
            "paymentMethodId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "code": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "responsibleId": {"dataType":"string"},
            "viewTime": {"dataType":"string"},
            "paymentVoucher": {"dataType":"string"},
            "paidWith": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["USD"]},{"dataType":"enum","enums":["BS"]}]},
            "exchangeRate": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[1]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllOrder": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
            "status": {"dataType":"union","subSchemas":[{"ref":"EStatusOrder"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "isClient": {"dataType":"boolean"},
            "rolType": {"dataType":"string"},
            "userId": {"dataType":"string"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IOrderAttributes.id_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IOrderAttributes.userId-or-dniType-or-dni-or-date-or-amount-or-amountWithoutTax-or-valueTax-or-location-or-nameClient-or-phoneNumber__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"dni":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},"dniType":{"dataType":"string"},"phoneNumber":{"dataType":"string"},"location":{"dataType":"string"},"userId":{"dataType":"string"},"date":{"dataType":"string"},"amount":{"dataType":"double"},"amountWithoutTax":{"dataType":"double"},"valueTax":{"dataType":"double"},"nameClient":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IOrderProductAttributes.id_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IOrderProductAttributes.productId-or-orderId-or-code-or-salePrice-or-valueTax-or-quantity-or-subtotalTax-or-subtotal__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"productId":{"dataType":"string"},"code":{"dataType":"string"},"valueTax":{"dataType":"double"},"orderId":{"dataType":"string"},"salePrice":{"dataType":"double"},"quantity":{"dataType":"double"},"subtotalTax":{"dataType":"double"},"subtotal":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderProductCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IOrderProductAttributes.id_"},{"ref":"Partial_Pick_IOrderProductAttributes.productId-or-orderId-or-code-or-salePrice-or-valueTax-or-quantity-or-subtotalTax-or-subtotal__"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IOrderAttributes.id_"},{"ref":"Partial_Pick_IOrderAttributes.userId-or-dniType-or-dni-or-date-or-amount-or-amountWithoutTax-or-valueTax-or-location-or-nameClient-or-phoneNumber__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"exchangeRate":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[1]}]},"paidWith":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["USD"]},{"dataType":"enum","enums":["BS"]}]},"paymentVoucher":{"dataType":"string"},"viewTime":{"dataType":"string"},"responsibleId":{"dataType":"string"},"paymentMethodId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"typePayment":{"dataType":"union","subSchemas":[{"ref":"ETypePaymentMethods"},{"dataType":"enum","enums":[null]}]},"reference":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"ref":"EStatusOrder"},{"dataType":"enum","enums":[null]}]},"observation":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"products":{"dataType":"array","array":{"dataType":"refAlias","ref":"IOrderProductCreationAttributes"}}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INotificationAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "title": {"dataType":"string","required":true},
            "body": {"dataType":"string","required":true},
            "data": {"dataType":"string"},
            "type": {"dataType":"string"},
            "userId": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "isView": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllNotification": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"INotificationAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INotificationFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userId": {"dataType":"string"},
            "isView": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMapAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "image": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "address": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
            "email": {"dataType":"string"},
            "map": {"dataType":"string","required":true},
            "status": {"dataType":"boolean","required":true},
            "order": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllMap": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IMapAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMapFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isClient": {"dataType":"boolean"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IMapAttributes.id_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IMapAttributes.name-or-image-or-map__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"image":{"dataType":"string"},"map":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMapCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IMapAttributes.id_"},{"ref":"Partial_Pick_IMapAttributes.name-or-image-or-map__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"enum","enums":[null]},"order":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[0]}]},"email":{"dataType":"string"},"phoneNumber":{"dataType":"string"},"address":{"dataType":"string"},"description":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDownloadOrder": {
        "dataType": "refObject",
        "properties": {
            "fecha": {"dataType":"string"},
            "wasSent": {"dataType":"double"},
            "product": {"dataType":"boolean"},
            "fe": {"dataType":"string"},
            "usu": {"dataType":"string"},
            "cla": {"dataType":"string"},
            "bd": {"dataType":"string"},
            "time": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOutputProduct": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"string","required":true},
            "wasSent": {"dataType":"double"},
            "product": {"dataType":"boolean"},
            "fe": {"dataType":"string"},
            "usu": {"dataType":"string"},
            "cla": {"dataType":"string"},
            "bd": {"dataType":"string"},
            "time": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUploadZipReponseError": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "file": {"dataType":"string","required":true},
            "msg": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUploadZipReponse": {
        "dataType": "refObject",
        "properties": {
            "result": {"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true},"file":{"dataType":"double","required":true},"status":{"dataType":"boolean","required":true}},"required":true},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"IUploadZipReponseError"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDepartmentAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "icon": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "code": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true},
            "isSalient": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllDepartment": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IDepartmentAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDepartmentFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isSalient": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "product": {"dataType":"boolean"},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isClient": {"dataType":"boolean"},
            "categories": {"dataType":"boolean"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
            "productName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "minPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "maxPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "categoriesIds": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "typePrice": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["price"]},{"dataType":"enum","enums":["priceBs"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IDepartmentAttributes.id-or-description_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"description":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IDepartmentAttributes.name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDepartmentCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IDepartmentAttributes.id-or-description_"},{"ref":"Partial_Pick_IDepartmentAttributes.name__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"icon":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"code":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"isSalient":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[false]}],"required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
            "symbol": {"dataType":"string"},
            "exchangeRate": {"dataType":"double","required":true},
            "autoUpdate": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICurrencyAttributes.name-or-code-or-exchangeRate-or-autoUpdate-or-symbol_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"symbol":{"dataType":"string"},"name":{"dataType":"string","required":true},"code":{"dataType":"string","required":true},"exchangeRate":{"dataType":"double","required":true},"autoUpdate":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyCreationAttributes": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ICurrencyAttributes.name-or-code-or-exchangeRate-or-autoUpdate-or-symbol_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EConversationStatus": {
        "dataType": "refEnum",
        "enums": [1,2,3,4],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IConversationMessageAttributes.id-or-message_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"message":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EMessageSender": {
        "dataType": "refEnum",
        "enums": ["bot","user","admin","operator"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EMessageType": {
        "dataType": "refEnum",
        "enums": ["text","option","question","system"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConversationMessageCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IConversationMessageAttributes.id-or-message_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"selectedOption":{"dataType":"any"},"chatQuestion":{"dataType":"any"},"metadata":{"dataType":"union","subSchemas":[{"ref":"Record_string.any_"},{"dataType":"enum","enums":[null]}]},"messageType":{"ref":"EMessageType"},"index":{"dataType":"double","required":true},"from":{"ref":"EMessageSender","required":true},"conversationId":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConversationAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "context": {"dataType":"union","subSchemas":[{"ref":"Record_string.any_"},{"dataType":"enum","enums":[null]}]},
            "status": {"ref":"EConversationStatus","required":true},
            "responsibleId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "viewTime": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "messages": {"dataType":"array","array":{"dataType":"refAlias","ref":"IConversationMessageCreationAttributes"}},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllConversation": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IConversationAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConversationFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IConversationAttributes.id-or-context_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"context":{"ref":"Record_string.any_"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConversationCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IConversationAttributes.id-or-context_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"messages":{"dataType":"array","array":{"dataType":"refAlias","ref":"IConversationMessageCreationAttributes"}},"status":{"ref":"EConversationStatus","required":true},"viewTime":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"responsibleId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"context":{"dataType":"union","subSchemas":[{"ref":"Record_string.any_"},{"dataType":"enum","enums":[null]}]},"userId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IChatAnswerAttributes.name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IChatQuestionAttributes.name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IChatAnswerCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Partial_Pick_IChatAnswerAttributes.name__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"enum","enums":[null]},"chatQuestion":{"dataType":"union","subSchemas":[{"ref":"IChatQuestionCreationAttributes"},{"dataType":"enum","enums":[null]}]},"answerType":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"autoResponse":{"dataType":"string"},"chatAnswerId":{"dataType":"string"},"chatQuestionId":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}]},"id":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IChatQuestionCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Partial_Pick_IChatQuestionAttributes.name__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"options":{"dataType":"array","array":{"dataType":"refAlias","ref":"IChatAnswerCreationAttributes"}},"autoResponse":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"type":{"dataType":"string"},"chatAnswerId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"chatQuestionId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}]},"id":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IChatQuestionAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "chatQuestionId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "chatAnswerId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "type": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "autoResponse": {"dataType":"string"},
            "options": {"dataType":"array","array":{"dataType":"refAlias","ref":"IChatAnswerCreationAttributes"}},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IChatShowClientFilter": {
        "dataType": "refObject",
        "properties": {
            "chatQuestionId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "chatAnswerId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "type": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllChatQuestion": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IChatQuestionAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IChatQuestionFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isClient": {"dataType":"boolean"},
            "sort": {"dataType":"any"},
            "filters": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICategoryAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "icon": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"string","required":true},
            "code": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true},
            "departmentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isSalient": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllCategory": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ICategoryAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICategoryFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isSalient": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "departmentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "departmentIds": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isClient": {"dataType":"boolean"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
            "productName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "minPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "maxPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "categoriesIds": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "categories": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "typePrice": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["price"]},{"dataType":"enum","enums":["priceBs"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICategoryAttributes.id-or-description-or-icon_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"description":{"dataType":"string"},"icon":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_ICategoryAttributes.name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICategoryCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_ICategoryAttributes.id-or-description-or-icon_"},{"ref":"Partial_Pick_ICategoryAttributes.name__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"isSalient":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},"departmentId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"code":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPositionBanner": {
        "dataType": "refEnum",
        "enums": ["homePrincipal","homeSecondary","homeTertiary","TikTok","Instagram","Contact","PopupOnce","AlwaysPopup","Product","Filter"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBannerAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "images": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "alt": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"boolean"},
            "position": {"ref":"EPositionBanner","required":true},
            "mobileImage": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "deletedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllBanner": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IBannerAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBannerFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "position": {"ref":"EPositionBanner"},
            "isClient": {"dataType":"boolean"},
            "typeSearch": {"dataType":"string"},
            "filters": {"dataType":"any"},
            "sort": {"dataType":"any"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IBannerAttributes.id_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_IBannerAttributes.name-or-images__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"images":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPositionBanner.HomePrincipal": {
        "dataType": "refEnum",
        "enums": ["homePrincipal"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBannerCreationAttributes": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_IBannerAttributes.id_"},{"ref":"Partial_Pick_IBannerAttributes.name-or-images__"},{"dataType":"nestedObjectLiteral","nestedProperties":{"mobileImage":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"position":{"dataType":"union","subSchemas":[{"ref":"EPositionBanner"},{"ref":"EPositionBanner.HomePrincipal"}]},"alt":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"description":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[true]}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        const argsFileController_uploadFile: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"any"},"reason":{"dataType":"string","required":true}}},
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                files: {"in":"formData","name":"files","required":true,"dataType":"array","array":{"dataType":"file"}},
        };
        app.post('/files/uploadFile',
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                },
                {
                    name: "files",
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(FileController)),
            ...(fetchMiddlewares<RequestHandler>(FileController.prototype.uploadFile)),

            async function FileController_uploadFile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFileController_uploadFile, request, response });

                const controller = new FileController();

              await templateService.apiHandler({
                methodName: 'uploadFile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFileController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"type":{"dataType":"union","subSchemas":[{"ref":"FileType"},{"dataType":"enum","enums":[null]}]},"fileName":{"dataType":"string","required":true}}},
        };
        app.delete('/files/delete',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(FileController)),
            ...(fetchMiddlewares<RequestHandler>(FileController.prototype.delete)),

            async function FileController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFileController_delete, request, response });

                const controller = new FileController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsViewsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                viewId: {"in":"path","name":"viewId","required":true,"dataType":"string"},
        };
        app.get('/views/show/:viewId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ViewsController)),
            ...(fetchMiddlewares<RequestHandler>(ViewsController.prototype.get)),

            async function ViewsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsViewsController_get, request, response });

                const controller = new ViewsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsViewsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IViewFilter"},
        };
        app.get('/views/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ViewsController)),
            ...(fetchMiddlewares<RequestHandler>(ViewsController.prototype.all)),

            async function ViewsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsViewsController_all, request, response });

                const controller = new ViewsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsViewsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IViewCreationAttributes"},
        };
        app.post('/views/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ViewsController)),
            ...(fetchMiddlewares<RequestHandler>(ViewsController.prototype.create)),

            async function ViewsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsViewsController_create, request, response });

                const controller = new ViewsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsViewsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                viewId: {"in":"path","name":"viewId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IViewCreationAttributes"},
        };
        app.put('/views/update/:viewId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ViewsController)),
            ...(fetchMiddlewares<RequestHandler>(ViewsController.prototype.update)),

            async function ViewsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsViewsController_update, request, response });

                const controller = new ViewsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsViewsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/views/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ViewsController)),
            ...(fetchMiddlewares<RequestHandler>(ViewsController.prototype.softDeleteRecord)),

            async function ViewsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsViewsController_softDeleteRecord, request, response });

                const controller = new ViewsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_get: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.get('/users/show/:userId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.get)),

            async function UsersController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_get, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IUserFilter"},
        };
        app.get('/users/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.all)),

            async function UsersController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_all, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IUserCreationAttributes"},
        };
        app.post('/users/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.create)),

            async function UsersController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_create, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_update: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IUserUpdatenAttributes"},
        };
        app.put('/users/update/:userId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.update)),

            async function UsersController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_update, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_updateRol: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"rolId":{"dataType":"string","required":true}}},
        };
        app.put('/users/updateRol/:userId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.updateRol)),

            async function UsersController_updateRol(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_updateRol, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'updateRol',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_updateTokenPush: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"request","name":"pQueryParams","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"tokenPush":{"dataType":"string","required":true}}},
        };
        app.put('/users/updateTokenPush',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.updateTokenPush)),

            async function UsersController_updateTokenPush(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_updateTokenPush, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'updateTokenPush',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/users/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.softDeleteRecord)),

            async function UsersController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_softDeleteRecord, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRolsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                rolId: {"in":"path","name":"rolId","required":true,"dataType":"string"},
        };
        app.get('/rols/show/:rolId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RolsController)),
            ...(fetchMiddlewares<RequestHandler>(RolsController.prototype.get)),

            async function RolsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRolsController_get, request, response });

                const controller = new RolsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRolsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IRolFilter"},
        };
        app.get('/rols/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RolsController)),
            ...(fetchMiddlewares<RequestHandler>(RolsController.prototype.all)),

            async function RolsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRolsController_all, request, response });

                const controller = new RolsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRolsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IRolCreationAttributes"},
        };
        app.post('/rols/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RolsController)),
            ...(fetchMiddlewares<RequestHandler>(RolsController.prototype.create)),

            async function RolsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRolsController_create, request, response });

                const controller = new RolsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRolsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                rolId: {"in":"path","name":"rolId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IRolCreationAttributes"},
        };
        app.put('/rols/:rolId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RolsController)),
            ...(fetchMiddlewares<RequestHandler>(RolsController.prototype.update)),

            async function RolsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRolsController_update, request, response });

                const controller = new RolsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRolsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/rols/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RolsController)),
            ...(fetchMiddlewares<RequestHandler>(RolsController.prototype.softDeleteRecord)),

            async function RolsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRolsController_softDeleteRecord, request, response });

                const controller = new RolsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IUserCreationAttributes"},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                pRequestBody: {"in":"body","name":"pRequestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"recaptchaToken":{"dataType":"string"},"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_me: Record<string, TsoaRoute.ParameterSchema> = {
                pRequestBody: {"in":"request","name":"pRequestBody","required":true,"dataType":"object"},
        };
        app.get('/auth/me',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.me)),

            async function AuthController_me(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_me, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'me',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_passwordUpdate: Record<string, TsoaRoute.ParameterSchema> = {
                pRequest: {"in":"request","name":"pRequest","required":true,"dataType":"object"},
                pRequestBody: {"in":"body","name":"pRequestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"oldPasword":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"passwordConfirmation":{"dataType":"string","required":true}}},
        };
        app.patch('/auth/password',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.passwordUpdate)),

            async function AuthController_passwordUpdate(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_passwordUpdate, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'passwordUpdate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_update: Record<string, TsoaRoute.ParameterSchema> = {
                pRequest: {"in":"request","name":"pRequest","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IAuthUserUpdatenAttributes"},
        };
        app.put('/auth/update/:userId',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.update)),

            async function AuthController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_update, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_updateTokenPush: Record<string, TsoaRoute.ParameterSchema> = {
                pRequest: {"in":"request","name":"pRequest","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"tokenPush":{"dataType":"string","required":true}}},
        };
        app.patch('/auth/updateTokenPush',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.updateTokenPush)),

            async function AuthController_updateTokenPush(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_updateTokenPush, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'updateTokenPush',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_passwordReset: Record<string, TsoaRoute.ParameterSchema> = {
                pRequestBody: {"in":"body","name":"pRequestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
        };
        app.post('/auth/passwordReset',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.passwordReset)),

            async function AuthController_passwordReset(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_passwordReset, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'passwordReset',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_passwordRecovery: Record<string, TsoaRoute.ParameterSchema> = {
                pRequestBody: {"in":"body","name":"pRequestBody","required":true,"ref":"IPasswordRecovery"},
        };
        app.post('/auth/passwordRecovery',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.passwordRecovery)),

            async function AuthController_passwordRecovery(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_passwordRecovery, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'passwordRecovery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                pRequestBody: {"in":"request","name":"pRequestBody","required":true,"dataType":"object"},
        };
        app.delete('/auth/deleted',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.softDeleteRecord)),

            async function AuthController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_softDeleteRecord, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveysController_get: Record<string, TsoaRoute.ParameterSchema> = {
                surveyId: {"in":"path","name":"surveyId","required":true,"dataType":"string"},
        };
        app.get('/surveys/show/:surveyId',
            ...(fetchMiddlewares<RequestHandler>(SurveysController)),
            ...(fetchMiddlewares<RequestHandler>(SurveysController.prototype.get)),

            async function SurveysController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveysController_get, request, response });

                const controller = new SurveysController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveysController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ISurveyFilter"},
        };
        app.get('/surveys/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveysController)),
            ...(fetchMiddlewares<RequestHandler>(SurveysController.prototype.all)),

            async function SurveysController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveysController_all, request, response });

                const controller = new SurveysController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveysController_leftSurvey: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"leftSurveyParams"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/surveys/leftSurvey',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveysController)),
            ...(fetchMiddlewares<RequestHandler>(SurveysController.prototype.leftSurvey)),

            async function SurveysController_leftSurvey(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveysController_leftSurvey, request, response });

                const controller = new SurveysController();

              await templateService.apiHandler({
                methodName: 'leftSurvey',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveysController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyCreationAttributes"},
        };
        app.post('/surveys/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveysController)),
            ...(fetchMiddlewares<RequestHandler>(SurveysController.prototype.create)),

            async function SurveysController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveysController_create, request, response });

                const controller = new SurveysController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveysController_update: Record<string, TsoaRoute.ParameterSchema> = {
                surveyId: {"in":"path","name":"surveyId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyAttributes"},
        };
        app.put('/surveys/update/:surveyId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveysController)),
            ...(fetchMiddlewares<RequestHandler>(SurveysController.prototype.update)),

            async function SurveysController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveysController_update, request, response });

                const controller = new SurveysController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveysController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/surveys/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveysController)),
            ...(fetchMiddlewares<RequestHandler>(SurveysController.prototype.softDeleteRecord)),

            async function SurveysController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveysController_softDeleteRecord, request, response });

                const controller = new SurveysController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyResponsesController_get: Record<string, TsoaRoute.ParameterSchema> = {
                surveyResponseId: {"in":"path","name":"surveyResponseId","required":true,"dataType":"string"},
        };
        app.get('/surveyResponses/show/:surveyResponseId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController.prototype.get)),

            async function SurveyResponsesController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyResponsesController_get, request, response });

                const controller = new SurveyResponsesController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyResponsesController_allUser: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ISurveyResponseFilter"},
        };
        app.get('/surveyResponses/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController.prototype.allUser)),

            async function SurveyResponsesController_allUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyResponsesController_allUser, request, response });

                const controller = new SurveyResponsesController();

              await templateService.apiHandler({
                methodName: 'allUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyResponsesController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyResponseCreationAttributes"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/surveyResponses/create',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController.prototype.create)),

            async function SurveyResponsesController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyResponsesController_create, request, response });

                const controller = new SurveyResponsesController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyResponsesController_update: Record<string, TsoaRoute.ParameterSchema> = {
                surveyResponseId: {"in":"path","name":"surveyResponseId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyResponseAttributes"},
        };
        app.put('/surveyResponses/:surveyResponseId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController.prototype.update)),

            async function SurveyResponsesController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyResponsesController_update, request, response });

                const controller = new SurveyResponsesController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyResponsesController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                surveyUserId: {"in":"path","name":"surveyUserId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyUserUpdateAttributes"},
        };
        app.put('/surveyResponses/updateUser/:surveyUserId',
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController.prototype.updateUser)),

            async function SurveyResponsesController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyResponsesController_updateUser, request, response });

                const controller = new SurveyResponsesController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyResponsesController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/surveyResponses/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyResponsesController.prototype.softDeleteRecord)),

            async function SurveyResponsesController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyResponsesController_softDeleteRecord, request, response });

                const controller = new SurveyResponsesController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyQuestionsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                surveyQuestionId: {"in":"path","name":"surveyQuestionId","required":true,"dataType":"string"},
        };
        app.get('/surveyQuestions/show/:surveyQuestionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController.prototype.get)),

            async function SurveyQuestionsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyQuestionsController_get, request, response });

                const controller = new SurveyQuestionsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyQuestionsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ISurveyQuestionFilter"},
        };
        app.get('/surveyQuestions/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController.prototype.all)),

            async function SurveyQuestionsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyQuestionsController_all, request, response });

                const controller = new SurveyQuestionsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyQuestionsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyQuestionCreationAttributes"},
        };
        app.post('/surveyQuestions/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController.prototype.create)),

            async function SurveyQuestionsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyQuestionsController_create, request, response });

                const controller = new SurveyQuestionsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyQuestionsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                surveyQuestionId: {"in":"path","name":"surveyQuestionId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyQuestionUpdateAttributes"},
        };
        app.put('/surveyQuestions/update/:surveyQuestionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController.prototype.update)),

            async function SurveyQuestionsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyQuestionsController_update, request, response });

                const controller = new SurveyQuestionsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyQuestionsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/surveyQuestions/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyQuestionsController.prototype.softDeleteRecord)),

            async function SurveyQuestionsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyQuestionsController_softDeleteRecord, request, response });

                const controller = new SurveyQuestionsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyAnswerOptionsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                surveyAnswerOptionId: {"in":"path","name":"surveyAnswerOptionId","required":true,"dataType":"string"},
        };
        app.get('/surveyAnswerOptions/show/:surveyAnswerOptionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController.prototype.get)),

            async function SurveyAnswerOptionsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyAnswerOptionsController_get, request, response });

                const controller = new SurveyAnswerOptionsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyAnswerOptionsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ISurveyAnswerOptionFilter"},
        };
        app.get('/surveyAnswerOptions/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController.prototype.all)),

            async function SurveyAnswerOptionsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyAnswerOptionsController_all, request, response });

                const controller = new SurveyAnswerOptionsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyAnswerOptionsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyAnswerOptionCreationAttributes"},
        };
        app.post('/surveyAnswerOptions/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController.prototype.create)),

            async function SurveyAnswerOptionsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyAnswerOptionsController_create, request, response });

                const controller = new SurveyAnswerOptionsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyAnswerOptionsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                surveyAnswerOptionId: {"in":"path","name":"surveyAnswerOptionId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISurveyAnswerOptionAttributes"},
        };
        app.put('/surveyAnswerOptions/update/:surveyAnswerOptionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController.prototype.update)),

            async function SurveyAnswerOptionsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyAnswerOptionsController_update, request, response });

                const controller = new SurveyAnswerOptionsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSurveyAnswerOptionsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/surveyAnswerOptions/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController)),
            ...(fetchMiddlewares<RequestHandler>(SurveyAnswerOptionsController.prototype.softDeleteRecord)),

            async function SurveyAnswerOptionsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSurveyAnswerOptionsController_softDeleteRecord, request, response });

                const controller = new SurveyAnswerOptionsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSuggestionsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                suggestionId: {"in":"path","name":"suggestionId","required":true,"dataType":"string"},
        };
        app.get('/suggestions/show/:suggestionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController.prototype.get)),

            async function SuggestionsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSuggestionsController_get, request, response });

                const controller = new SuggestionsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSuggestionsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ISuggestionFilter"},
        };
        app.get('/suggestions/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController.prototype.all)),

            async function SuggestionsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSuggestionsController_all, request, response });

                const controller = new SuggestionsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSuggestionsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISuggestionCreationAttributes"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/suggestions/create',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController.prototype.create)),

            async function SuggestionsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSuggestionsController_create, request, response });

                const controller = new SuggestionsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSuggestionsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                suggestionId: {"in":"path","name":"suggestionId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISuggestionAttributes"},
        };
        app.put('/suggestions/update/:suggestionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController.prototype.update)),

            async function SuggestionsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSuggestionsController_update, request, response });

                const controller = new SuggestionsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSuggestionsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/suggestions/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController)),
            ...(fetchMiddlewares<RequestHandler>(SuggestionsController.prototype.softDeleteRecord)),

            async function SuggestionsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSuggestionsController_softDeleteRecord, request, response });

                const controller = new SuggestionsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductReviewController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IProductReviewFilter"},
        };
        app.get('/product-reviews/all',
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController.prototype.all)),

            async function ProductReviewController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductReviewController_all, request, response });

                const controller = new ProductReviewController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductReviewController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IProductReviewCreationAttributes"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/product-reviews/create',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController.prototype.create)),

            async function ProductReviewController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductReviewController_create, request, response });

                const controller = new ProductReviewController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductReviewController_approve: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"isApproved":{"dataType":"boolean","required":true}}},
        };
        app.put('/product-reviews/approve/:id',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController.prototype.approve)),

            async function ProductReviewController_approve(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductReviewController_approve, request, response });

                const controller = new ProductReviewController();

              await templateService.apiHandler({
                methodName: 'approve',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductReviewController_initializeProductReviews: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.put('/product-reviews/initializeProductReviews',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ProductReviewController.prototype.initializeProductReviews)),

            async function ProductReviewController_initializeProductReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductReviewController_initializeProductReviews, request, response });

                const controller = new ProductReviewController();

              await templateService.apiHandler({
                methodName: 'initializeProductReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                requestBody: {"in":"request","name":"requestBody","required":true,"dataType":"object"},
        };
        app.get('/products/show/:productId',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.get)),

            async function ProductsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_get, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_getByName: Record<string, TsoaRoute.ParameterSchema> = {
                productName: {"in":"path","name":"productName","required":true,"dataType":"string"},
                requestBody: {"in":"request","name":"requestBody","required":true,"dataType":"object"},
        };
        app.get('/products/show-by-name/:productName',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.getByName)),

            async function ProductsController_getByName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_getByName, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'getByName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IProductFilter"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/products/all',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.all)),

            async function ProductsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_all, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_search: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IProductFilter"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/products/search',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.search)),

            async function ProductsController_search(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_search, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'search',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IProductCreationAttributes"},
        };
        app.post('/products/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.create)),

            async function ProductsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_create, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IProductCreationAttributes"},
        };
        app.put('/products/update/:productId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.update)),

            async function ProductsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_update, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/products/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.softDeleteRecord)),

            async function ProductsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_softDeleteRecord, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_imagesDelete: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/products/imagesDelete/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.imagesDelete)),

            async function ProductsController_imagesDelete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_imagesDelete, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'imagesDelete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductsController_suggestions: Record<string, TsoaRoute.ParameterSchema> = {
                search: {"in":"query","name":"search","required":true,"dataType":"string"},
        };
        app.get('/products/suggestions',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.suggestions)),

            async function ProductsController_suggestions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_suggestions, request, response });

                const controller = new ProductsController();

              await templateService.apiHandler({
                methodName: 'suggestions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductCommentController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IProductCommentFilter"},
        };
        app.get('/product-comments/all',
            ...(fetchMiddlewares<RequestHandler>(ProductCommentController)),
            ...(fetchMiddlewares<RequestHandler>(ProductCommentController.prototype.all)),

            async function ProductCommentController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductCommentController_all, request, response });

                const controller = new ProductCommentController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductCommentController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IProductCommentCreationAttributes"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/product-comments/create',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductCommentController)),
            ...(fetchMiddlewares<RequestHandler>(ProductCommentController.prototype.create)),

            async function ProductCommentController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductCommentController_create, request, response });

                const controller = new ProductCommentController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductCommentController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/product-comments/delete/:id',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductCommentController)),
            ...(fetchMiddlewares<RequestHandler>(ProductCommentController.prototype.delete)),

            async function ProductCommentController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductCommentController_delete, request, response });

                const controller = new ProductCommentController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavoriteProductsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                favoriteProductId: {"in":"path","name":"favoriteProductId","required":true,"dataType":"string"},
        };
        app.get('/favoriteProducts/show/:favoriteProductId',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController)),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController.prototype.get)),

            async function FavoriteProductsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavoriteProductsController_get, request, response });

                const controller = new FavoriteProductsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavoriteProductsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IFavoriteProductFilter"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/favoriteProducts/all',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController)),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController.prototype.all)),

            async function FavoriteProductsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavoriteProductsController_all, request, response });

                const controller = new FavoriteProductsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavoriteProductsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IFavoriteProductCreationAttributes"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/favoriteProducts/create',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController)),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController.prototype.create)),

            async function FavoriteProductsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavoriteProductsController_create, request, response });

                const controller = new FavoriteProductsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavoriteProductsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                favoriteProductId: {"in":"path","name":"favoriteProductId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IFavoriteProductCreationAttributes"},
        };
        app.put('/favoriteProducts/update/:favoriteProductId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController)),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController.prototype.update)),

            async function FavoriteProductsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavoriteProductsController_update, request, response });

                const controller = new FavoriteProductsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavoriteProductsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/favoriteProducts/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController)),
            ...(fetchMiddlewares<RequestHandler>(FavoriteProductsController.prototype.softDeleteRecord)),

            async function FavoriteProductsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavoriteProductsController_softDeleteRecord, request, response });

                const controller = new FavoriteProductsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
        };
        app.get('/posts/show/:postId',
            ...(fetchMiddlewares<RequestHandler>(PostsController)),
            ...(fetchMiddlewares<RequestHandler>(PostsController.prototype.get)),

            async function PostsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostsController_get, request, response });

                const controller = new PostsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostsController_slug: Record<string, TsoaRoute.ParameterSchema> = {
                slug: {"in":"path","name":"slug","required":true,"dataType":"string"},
        };
        app.get('/posts/slug/:slug',
            ...(fetchMiddlewares<RequestHandler>(PostsController)),
            ...(fetchMiddlewares<RequestHandler>(PostsController.prototype.slug)),

            async function PostsController_slug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostsController_slug, request, response });

                const controller = new PostsController();

              await templateService.apiHandler({
                methodName: 'slug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IPostFilter"},
        };
        app.get('/posts/all',
            ...(fetchMiddlewares<RequestHandler>(PostsController)),
            ...(fetchMiddlewares<RequestHandler>(PostsController.prototype.all)),

            async function PostsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostsController_all, request, response });

                const controller = new PostsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"intersection","subSchemas":[{"ref":"IPostCreationAttributes"},{"dataType":"nestedObjectLiteral","nestedProperties":{"productIds":{"dataType":"array","array":{"dataType":"string"}}}}]},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/posts/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PostsController)),
            ...(fetchMiddlewares<RequestHandler>(PostsController.prototype.create)),

            async function PostsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostsController_create, request, response });

                const controller = new PostsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"intersection","subSchemas":[{"ref":"IPostCreationAttributes"},{"dataType":"nestedObjectLiteral","nestedProperties":{"productIds":{"dataType":"array","array":{"dataType":"string"}}}}]},
        };
        app.put('/posts/update/:postId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PostsController)),
            ...(fetchMiddlewares<RequestHandler>(PostsController.prototype.update)),

            async function PostsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostsController_update, request, response });

                const controller = new PostsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/posts/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PostsController)),
            ...(fetchMiddlewares<RequestHandler>(PostsController.prototype.softDeleteRecord)),

            async function PostsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostsController_softDeleteRecord, request, response });

                const controller = new PostsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
        };
        app.get('/permissions/show/:permissionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController.prototype.get)),

            async function PermissionsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionsController_get, request, response });

                const controller = new PermissionsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IPermissionFilter"},
        };
        app.get('/permissions/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController.prototype.all)),

            async function PermissionsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionsController_all, request, response });

                const controller = new PermissionsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPermissionCreationAttributes"},
        };
        app.post('/permissions/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController.prototype.create)),

            async function PermissionsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionsController_create, request, response });

                const controller = new PermissionsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPermissionCreationAttributes"},
        };
        app.put('/permissions/update/:permissionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController.prototype.update)),

            async function PermissionsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionsController_update, request, response });

                const controller = new PermissionsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/permissions/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionsController.prototype.softDeleteRecord)),

            async function PermissionsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionsController_softDeleteRecord, request, response });

                const controller = new PermissionsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentMethodsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                paymentMethodId: {"in":"path","name":"paymentMethodId","required":true,"dataType":"string"},
        };
        app.get('/paymentMethods/show/:paymentMethodId',
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController.prototype.get)),

            async function PaymentMethodsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentMethodsController_get, request, response });

                const controller = new PaymentMethodsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentMethodsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IPaymentMethodFilter"},
        };
        app.get('/paymentMethods/all',
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController.prototype.all)),

            async function PaymentMethodsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentMethodsController_all, request, response });

                const controller = new PaymentMethodsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentMethodsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPaymentMethodCreationAttributes"},
        };
        app.post('/paymentMethods/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController.prototype.create)),

            async function PaymentMethodsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentMethodsController_create, request, response });

                const controller = new PaymentMethodsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentMethodsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                paymentMethodId: {"in":"path","name":"paymentMethodId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPaymentMethodCreationAttributes"},
        };
        app.put('/paymentMethods/update/:paymentMethodId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController.prototype.update)),

            async function PaymentMethodsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentMethodsController_update, request, response });

                const controller = new PaymentMethodsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentMethodsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/paymentMethods/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentMethodsController.prototype.softDeleteRecord)),

            async function PaymentMethodsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentMethodsController_softDeleteRecord, request, response });

                const controller = new PaymentMethodsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOrdersController_get: Record<string, TsoaRoute.ParameterSchema> = {
                orderId: {"in":"path","name":"orderId","required":true,"dataType":"string"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/orders/show/:orderId',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.get)),

            async function OrdersController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOrdersController_get, request, response });

                const controller = new OrdersController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOrdersController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IOrderFilter"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/orders/all',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.all)),

            async function OrdersController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOrdersController_all, request, response });

                const controller = new OrdersController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOrdersController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IOrderCreationAttributes"},
                pQueryParams: {"in":"request","name":"pQueryParams","required":true,"dataType":"object"},
        };
        app.post('/orders/create',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.create)),

            async function OrdersController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOrdersController_create, request, response });

                const controller = new OrdersController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOrdersController_update: Record<string, TsoaRoute.ParameterSchema> = {
                orderId: {"in":"path","name":"orderId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IOrderCreationAttributes"},
        };
        app.put('/orders/update/:orderId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.update)),

            async function OrdersController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOrdersController_update, request, response });

                const controller = new OrdersController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOrdersController_updateStatus: Record<string, TsoaRoute.ParameterSchema> = {
                orderId: {"in":"path","name":"orderId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"adminId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"reason":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"ref":"EStatusOrder","required":true}}},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.put('/orders/updateStatus/:orderId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.updateStatus)),

            async function OrdersController_updateStatus(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOrdersController_updateStatus, request, response });

                const controller = new OrdersController();

              await templateService.apiHandler({
                methodName: 'updateStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOrdersController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/orders/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.softDeleteRecord)),

            async function OrdersController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOrdersController_softDeleteRecord, request, response });

                const controller = new OrdersController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsnotificationController_test: Record<string, TsoaRoute.ParameterSchema> = {
                tokenPush: {"in":"path","name":"tokenPush","required":true,"dataType":"string"},
        };
        app.get('/notifications/test/:tokenPush',
            ...(fetchMiddlewares<RequestHandler>(notificationController)),
            ...(fetchMiddlewares<RequestHandler>(notificationController.prototype.test)),

            async function notificationController_test(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsnotificationController_test, request, response });

                const controller = new notificationController();

              await templateService.apiHandler({
                methodName: 'test',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsnotificationController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"INotificationFilter"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/notifications/all',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(notificationController)),
            ...(fetchMiddlewares<RequestHandler>(notificationController.prototype.all)),

            async function notificationController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsnotificationController_all, request, response });

                const controller = new notificationController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsnotificationController_isView: Record<string, TsoaRoute.ParameterSchema> = {
                pRequest: {"in":"request","name":"pRequest","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"notificationId":{"dataType":"string","required":true}}},
        };
        app.patch('/notifications/isView',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(notificationController)),
            ...(fetchMiddlewares<RequestHandler>(notificationController.prototype.isView)),

            async function notificationController_isView(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsnotificationController_isView, request, response });

                const controller = new notificationController();

              await templateService.apiHandler({
                methodName: 'isView',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMapsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                mapId: {"in":"path","name":"mapId","required":true,"dataType":"string"},
        };
        app.get('/maps/show/:mapId',
            ...(fetchMiddlewares<RequestHandler>(MapsController)),
            ...(fetchMiddlewares<RequestHandler>(MapsController.prototype.get)),

            async function MapsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMapsController_get, request, response });

                const controller = new MapsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMapsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IMapFilter"},
        };
        app.get('/maps/all',
            ...(fetchMiddlewares<RequestHandler>(MapsController)),
            ...(fetchMiddlewares<RequestHandler>(MapsController.prototype.all)),

            async function MapsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMapsController_all, request, response });

                const controller = new MapsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMapsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IMapCreationAttributes"},
        };
        app.post('/maps/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(MapsController)),
            ...(fetchMiddlewares<RequestHandler>(MapsController.prototype.create)),

            async function MapsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMapsController_create, request, response });

                const controller = new MapsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMapsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                mapId: {"in":"path","name":"mapId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IMapCreationAttributes"},
        };
        app.put('/maps/update/:mapId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(MapsController)),
            ...(fetchMiddlewares<RequestHandler>(MapsController.prototype.update)),

            async function MapsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMapsController_update, request, response });

                const controller = new MapsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMapsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/maps/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(MapsController)),
            ...(fetchMiddlewares<RequestHandler>(MapsController.prototype.softDeleteRecord)),

            async function MapsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMapsController_softDeleteRecord, request, response });

                const controller = new MapsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsA2IntegrationController_downloadOrder: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"queries","name":"requestBody","required":true,"ref":"IDownloadOrder"},
        };
        app.get('/A2/archivophp2.php',
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController)),
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController.prototype.downloadOrder)),

            async function A2IntegrationController_downloadOrder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsA2IntegrationController_downloadOrder, request, response });

                const controller = new A2IntegrationController();

              await templateService.apiHandler({
                methodName: 'downloadOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsA2IntegrationController_downloadProductOrder: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"queries","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"time":{"dataType":"string"},"bd":{"dataType":"string"},"cla":{"dataType":"string"},"usu":{"dataType":"string"},"fe":{"dataType":"string"},"product":{"dataType":"boolean"},"wasSent":{"dataType":"double"}}},
        };
        app.get('/A2/detalle2.php',
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController)),
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController.prototype.downloadProductOrder)),

            async function A2IntegrationController_downloadProductOrder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsA2IntegrationController_downloadProductOrder, request, response });

                const controller = new A2IntegrationController();

              await templateService.apiHandler({
                methodName: 'downloadProductOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsA2IntegrationController_outputProduct: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IOutputProduct"},
        };
        app.post('/A2/importardata.php',
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController)),
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController.prototype.outputProduct)),

            async function A2IntegrationController_outputProduct(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsA2IntegrationController_outputProduct, request, response });

                const controller = new A2IntegrationController();

              await templateService.apiHandler({
                methodName: 'outputProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsA2IntegrationController_uploadZip: Record<string, TsoaRoute.ParameterSchema> = {
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                _req: {"in":"request","name":"_req","required":true,"dataType":"object"},
        };
        app.post('/A2/upload',
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController)),
            ...(fetchMiddlewares<RequestHandler>(A2IntegrationController.prototype.uploadZip)),

            async function A2IntegrationController_uploadZip(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsA2IntegrationController_uploadZip, request, response });

                const controller = new A2IntegrationController();

              await templateService.apiHandler({
                methodName: 'uploadZip',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDepartmentsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                departmentId: {"in":"path","name":"departmentId","required":true,"dataType":"string"},
        };
        app.get('/departments/show/:departmentId',
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController.prototype.get)),

            async function DepartmentsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDepartmentsController_get, request, response });

                const controller = new DepartmentsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDepartmentsController_getByName: Record<string, TsoaRoute.ParameterSchema> = {
                departmentName: {"in":"path","name":"departmentName","required":true,"dataType":"string"},
        };
        app.get('/departments/show-by-name/:departmentName',
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController.prototype.getByName)),

            async function DepartmentsController_getByName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDepartmentsController_getByName, request, response });

                const controller = new DepartmentsController();

              await templateService.apiHandler({
                methodName: 'getByName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDepartmentsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IDepartmentFilter"},
                requestBody: {"in":"request","name":"requestBody","required":true,"dataType":"object"},
        };
        app.get('/departments/all',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController.prototype.all)),

            async function DepartmentsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDepartmentsController_all, request, response });

                const controller = new DepartmentsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDepartmentsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IDepartmentCreationAttributes"},
        };
        app.post('/departments/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController.prototype.create)),

            async function DepartmentsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDepartmentsController_create, request, response });

                const controller = new DepartmentsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDepartmentsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                departmentId: {"in":"path","name":"departmentId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IDepartmentCreationAttributes"},
        };
        app.put('/departments/update/:departmentId',
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController.prototype.update)),

            async function DepartmentsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDepartmentsController_update, request, response });

                const controller = new DepartmentsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDepartmentsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/departments/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentsController.prototype.softDeleteRecord)),

            async function DepartmentsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDepartmentsController_softDeleteRecord, request, response });

                const controller = new DepartmentsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExchangeController_getBcvRate: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/exchange/bcv',
            ...(fetchMiddlewares<RequestHandler>(ExchangeController)),
            ...(fetchMiddlewares<RequestHandler>(ExchangeController.prototype.getBcvRate)),

            async function ExchangeController_getBcvRate(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExchangeController_getBcvRate, request, response });

                const controller = new ExchangeController();

              await templateService.apiHandler({
                methodName: 'getBcvRate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrenciesController_get: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/currencies/show/:id',
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController)),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.get)),

            async function CurrenciesController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrenciesController_get, request, response });

                const controller = new CurrenciesController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrenciesController_getOfCode: Record<string, TsoaRoute.ParameterSchema> = {
                code: {"in":"path","name":"code","required":true,"dataType":"string"},
        };
        app.get('/currencies/show-code/:code',
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController)),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.getOfCode)),

            async function CurrenciesController_getOfCode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrenciesController_getOfCode, request, response });

                const controller = new CurrenciesController();

              await templateService.apiHandler({
                methodName: 'getOfCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrenciesController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ICurrencyFilter"},
        };
        app.get('/currencies/all',
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController)),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.all)),

            async function CurrenciesController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrenciesController_all, request, response });

                const controller = new CurrenciesController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrenciesController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ICurrencyCreationAttributes"},
        };
        app.post('/currencies/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController)),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.create)),

            async function CurrenciesController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrenciesController_create, request, response });

                const controller = new CurrenciesController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrenciesController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ICurrencyCreationAttributes"},
        };
        app.put('/currencies/update/:id',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController)),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.update)),

            async function CurrenciesController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrenciesController_update, request, response });

                const controller = new CurrenciesController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrenciesController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/currencies/deleted/:id',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController)),
            ...(fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.softDeleteRecord)),

            async function CurrenciesController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrenciesController_softDeleteRecord, request, response });

                const controller = new CurrenciesController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsConversationsController_get: Record<string, TsoaRoute.ParameterSchema> = {
                conversationId: {"in":"path","name":"conversationId","required":true,"dataType":"string"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/conversations/show/:conversationId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController.prototype.get)),

            async function ConversationsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConversationsController_get, request, response });

                const controller = new ConversationsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsConversationsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IConversationFilter"},
        };
        app.get('/conversations/all',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController.prototype.all)),

            async function ConversationsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConversationsController_all, request, response });

                const controller = new ConversationsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsConversationsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IConversationCreationAttributes"},
        };
        app.post('/conversations/create',
            authenticateMiddleware([{"bearerAuth":["optional"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController.prototype.create)),

            async function ConversationsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConversationsController_create, request, response });

                const controller = new ConversationsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsConversationsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                conversationId: {"in":"path","name":"conversationId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IConversationCreationAttributes"},
        };
        app.put('/conversations/update/:conversationId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController.prototype.update)),

            async function ConversationsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConversationsController_update, request, response });

                const controller = new ConversationsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsConversationsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/conversations/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsController.prototype.softDeleteRecord)),

            async function ConversationsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConversationsController_softDeleteRecord, request, response });

                const controller = new ConversationsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChatQuestionsController_get: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/chatQuestions/show',
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController.prototype.get)),

            async function ChatQuestionsController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChatQuestionsController_get, request, response });

                const controller = new ChatQuestionsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChatQuestionsController_client: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IChatShowClientFilter"},
        };
        app.get('/chatQuestions/client',
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController.prototype.client)),

            async function ChatQuestionsController_client(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChatQuestionsController_client, request, response });

                const controller = new ChatQuestionsController();

              await templateService.apiHandler({
                methodName: 'client',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChatQuestionsController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IChatQuestionFilter"},
        };
        app.get('/chatQuestions/all',
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController.prototype.all)),

            async function ChatQuestionsController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChatQuestionsController_all, request, response });

                const controller = new ChatQuestionsController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChatQuestionsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"chatQuestions":{"dataType":"array","array":{"dataType":"refAlias","ref":"IChatQuestionCreationAttributes"},"required":true}}},
        };
        app.post('/chatQuestions/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController.prototype.create)),

            async function ChatQuestionsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChatQuestionsController_create, request, response });

                const controller = new ChatQuestionsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChatQuestionsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"chatQuestions":{"dataType":"array","array":{"dataType":"refAlias","ref":"IChatQuestionCreationAttributes"},"required":true}}},
        };
        app.put('/chatQuestions/update/:chatQuestionId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController.prototype.update)),

            async function ChatQuestionsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChatQuestionsController_update, request, response });

                const controller = new ChatQuestionsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChatQuestionsController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/chatQuestions/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController)),
            ...(fetchMiddlewares<RequestHandler>(ChatQuestionsController.prototype.softDeleteRecord)),

            async function ChatQuestionsController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChatQuestionsController_softDeleteRecord, request, response });

                const controller = new ChatQuestionsController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriesController_get: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"string"},
        };
        app.get('/categories/show/:categoryId',
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.get)),

            async function CategoriesController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriesController_get, request, response });

                const controller = new CategoriesController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriesController_getByName: Record<string, TsoaRoute.ParameterSchema> = {
                categoryName: {"in":"path","name":"categoryName","required":true,"dataType":"string"},
        };
        app.get('/categories/show-by-name/:categoryName',
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.getByName)),

            async function CategoriesController_getByName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriesController_getByName, request, response });

                const controller = new CategoriesController();

              await templateService.apiHandler({
                methodName: 'getByName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriesController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ICategoryFilter"},
        };
        app.get('/categories/all',
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.all)),

            async function CategoriesController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriesController_all, request, response });

                const controller = new CategoriesController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriesController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ICategoryCreationAttributes"},
        };
        app.post('/categories/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.create)),

            async function CategoriesController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriesController_create, request, response });

                const controller = new CategoriesController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriesController_update: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ICategoryCreationAttributes"},
        };
        app.put('/categories/update/:categoryId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.update)),

            async function CategoriesController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriesController_update, request, response });

                const controller = new CategoriesController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriesController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/categories/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.softDeleteRecord)),

            async function CategoriesController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriesController_softDeleteRecord, request, response });

                const controller = new CategoriesController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBannersController_get: Record<string, TsoaRoute.ParameterSchema> = {
                bannerId: {"in":"path","name":"bannerId","required":true,"dataType":"string"},
        };
        app.get('/banners/show/:bannerId',
            ...(fetchMiddlewares<RequestHandler>(BannersController)),
            ...(fetchMiddlewares<RequestHandler>(BannersController.prototype.get)),

            async function BannersController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBannersController_get, request, response });

                const controller = new BannersController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBannersController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IBannerFilter"},
        };
        app.get('/banners/all',
            ...(fetchMiddlewares<RequestHandler>(BannersController)),
            ...(fetchMiddlewares<RequestHandler>(BannersController.prototype.all)),

            async function BannersController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBannersController_all, request, response });

                const controller = new BannersController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBannersController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IBannerCreationAttributes"},
        };
        app.post('/banners/create',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(BannersController)),
            ...(fetchMiddlewares<RequestHandler>(BannersController.prototype.create)),

            async function BannersController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBannersController_create, request, response });

                const controller = new BannersController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBannersController_update: Record<string, TsoaRoute.ParameterSchema> = {
                bannerId: {"in":"path","name":"bannerId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IBannerCreationAttributes"},
        };
        app.put('/banners/update/:bannerId',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(BannersController)),
            ...(fetchMiddlewares<RequestHandler>(BannersController.prototype.update)),

            async function BannersController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBannersController_update, request, response });

                const controller = new BannersController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBannersController_softDeleteRecord: Record<string, TsoaRoute.ParameterSchema> = {
                key: {"in":"path","name":"key","required":true,"dataType":"string"},
        };
        app.delete('/banners/deleted/:key',
            authenticateMiddleware([{"bearerAuth":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(BannersController)),
            ...(fetchMiddlewares<RequestHandler>(BannersController.prototype.softDeleteRecord)),

            async function BannersController_softDeleteRecord(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBannersController_softDeleteRecord, request, response });

                const controller = new BannersController();

              await templateService.apiHandler({
                methodName: 'softDeleteRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
