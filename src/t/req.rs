use actix_web::HttpRequest;

const TOKEN_KEY: &'static str = "DODRIO-TOKEN";

/// 从请求头部中找出token。
pub fn ask_token(req: &HttpRequest) -> Option<&str> {
	req.headers().get(TOKEN_KEY).and_then(|value| value.to_str().ok())
}
