select
会话.sid, 用户.id, 用户.账号, 用户.用户名, 用户.电子邮箱, 用户.创建日期
from 会话
join 用户
on 会话.sid = $1 and 用户.id = 会话.用户id;
