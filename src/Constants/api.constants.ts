import { HttpHeaders } from "@angular/common/http";

// const BASE_URL = "http://yallashop.runasp.net/api";
const BASE_URL = "https://localhost:7110/api";
const CONTACT_END_POINT = "";
const CONTACTS_END_POINT = "/Contacts";
const OWNERS_END_POINT = "/Owners";
const LOGIN_END_POINT = "/Users/login";
const DASHBOARD_END_POINT = "/DashBoard";
const REFRESH_TOKEN_END_POINT = "/Users/refresh-token";

class ApiStatusCode {
    static readonly OK = 200;
    static readonly CREATED = 201;
    static readonly NO_CONTENT = 204;
    static readonly BAD_REQUEST = 400;
    static readonly UNAUTHORIZED = 401;
    static readonly FORBIDDEN = 403;
    static readonly NOT_FOUND = 404;
    static readonly INTERNAL_SERVER_ERROR = 500;
}

const customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Origin': "http://localhost:4200",
    'Access-Control-Allow-Origin': 'http://localhost:4200'
});

export {
    BASE_URL,
    CONTACT_END_POINT,
    CONTACTS_END_POINT,
    DASHBOARD_END_POINT,
    OWNERS_END_POINT,
    LOGIN_END_POINT,
    REFRESH_TOKEN_END_POINT,
    customHeaders,
    ApiStatusCode
};