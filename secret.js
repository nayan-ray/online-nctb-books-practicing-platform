import 'dotenv/config'


 const Mongo_connect_url = process.env.ATLAS_URL;
 const smtpUser = process.env.SMTP_USERNAME;
 const smtpPassword = process.env.SMTP_PASSWORD;
 const secretKey = process.env.SECRET_KEY;
 const login_secret_key = process.env.LOGIN_SECRET_KEY; 

export { Mongo_connect_url , smtpUser , smtpPassword, secretKey, login_secret_key};


