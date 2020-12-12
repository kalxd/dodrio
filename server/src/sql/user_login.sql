insert into 会话
(sid, 用户id)
values
(md5($1 || now()), $2)
on conflict (用户id)
do update set
最近登录日期 = now()
returning sid
