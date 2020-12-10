{- 整个配置定义类型 -}
let DB = ./DB.dhall

let Config
    : Type
    = { host : Text, port : Natural, db : DB, salt : Text }

in  Config
