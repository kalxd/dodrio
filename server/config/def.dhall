let Config = ./ConfigDef.dhall

let config
    : Config
    = { host = "127.0.0.1"
      , port = 3000
      , db =
        { host = "127.0.0.1"
        , port = 5432
        , dbname = "dodrio"
        , user = "postgres"
        , password = "postgres"
        }
      }

in  config
