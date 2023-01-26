# Build WebSocket server using Elixir
---
## Create new Elixir project
```sh
mix new websocket --module WebSocket
```

## Modify Mix project
1. On file `./mix.exs` register library `Riverside` by adding `{:riverside, "~> 2.2.1"}` in the `deps()` function
2. Add `mod: {WebSocket, []}` in the `application()` function to make `WebSocket` module as main module.

```elixir
defmodule WebSocket.MixProject do
use Mix.Project
def project do
 [
   app: :websocket,
   version: "0.1.0",
   elixir: "~> 1.13",
   start_permanent: Mix.env() == :prod,
   deps: deps()
 ]
end
# Run "mix help compile.app" to learn about applications.
def application do
 [
   extra_applications: [:logger],
   mod: {WebSocket, []}
]
end
# Run "mix help deps" to learn about dependencies.
defp deps do
 [
   # {:dep_from_hexpm, "~> 0.3.0"},
   # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
   {:riverside, "~> 2.2.1"}
  ]
end
end
```

Run this command to fetch dependencies:
```sh
mix deps.get
```

## Create WebSocket handler
Create new file `./lib/web_socket_handler.ex` dan write this following code:

```elixir
defmodule WebSocketHandler do
  use Riverside, otp_app: :websocket
  @impl Riverside
  def authenticate(request) do
    user = request.queries["from"]
    channel = request.queries["ch"]
    {:ok, user, %{}}
  end
@impl Riverside
  def init(session, state) do
    channel = get_channel(state)
    Riverside.LocalDelivery.join_channel(channel)
    {:ok, session, state}
  end
  @impl Riverside
  def handle_message(msg, session, state) do
   payload = %{
     "from" => session.user_id,
     "to" => state["channel"],
     "body" => msg
   }
   Riverside.LocalDelivery.deliver(
     {:channel, state["channel"]},
     {:text, Poison.encode!(payload)}
   )
   {:ok, session, state}
  end
  @impl Riverside
  def terminate(reason, session, state) do
    Logger.info("terminate reason: #{reason}")
    :ok
  end
end
```

## Modify main module and register Supervisor
Modify file `./lib/web_socket.ex` and write this following code:

```elixir
defmodule WebSocket do
  use Application
  require Logger
  def start(_type, _args) do
    children = [
      {Riverside, [handler: WebSocketHandler]}
    ]
    opts = [strategy: :one_for_one, name: WebSocket.Supervisor]
    Logger.info("application started")
    Supervisor.start_link(children, opts)
  end
end
```

## Create Elixir Configuration
Create new file `./config/config.exs` as default configuration file used by Mix prpject and write this following code:

```elixir
import Config
config :websocket, WebSocketHandler,
  codec: Riverside.Codec.RawText,
  port: 3000,
  path: "/ws",
  max_connections: 10000,
  max_connection_age: :infinity,
  idle_timeout: 120_000,
  reuse_port: false,
  show_debug_logs: false,
  transmission_limit: [
    capacity: 50,
    duration: 2000
  ],
import_config "#{config_env()}.exs"
```

then, create another config file `./config/dev.exs` used for development specific environtment configuration with content `import Config`

Please check Riverside config on Riverside documentation https://github.com/lyokato/riverside#configurations

## Running application
Run this command to run application
```bash
mix run --no-halt
```

## Test application
After application running, we can test websocket via google chrome console by right click on any google chrome page > inspect element > choose `console` menu.

Then write this following code for connecting to websocket:
```js
const exampleSocket = new WebSocket("ws://localhost:3000/ws?ch=santuy&from=satya", []);
```

Add event listener on message coming as websocket listener:
```js
exampleSocket.onmessage = function (event) {
  console.log(`receive message: ${event.data}`);
}
```

Send WebSocket message
```js
exampleSocket.send("halo yang ada di sana");
```

then, google chrome console will print this message:
```json
receive message: {"to":"santuy","from":"satya","body":"halo yang ada di sana"}
```

Done!

GitHub repository: https://github.com/satyasyahputra/elixir-websocket-server-example