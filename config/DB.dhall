{- 数据库定义类型。 -}

let DB
    : Type
    = { host : Text
      , port : Natural
      , user : Text
      , dbname : Text
      , password : Text
      }

in  DB
