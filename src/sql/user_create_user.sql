insert into 用户
(账号, 密码, 用户名, 电子邮箱)
values
($1, md5($2 || $5), $3, $4)
returning *
