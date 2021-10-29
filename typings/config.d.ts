declare type Environment =  'development' | 'production'

interface Config {
  environment: Environment
}

declare const CONFIG: Config;