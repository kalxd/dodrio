insert into 会话
(sid, 用户id)
values
(md5($1 || now()), $2)
returning sid
