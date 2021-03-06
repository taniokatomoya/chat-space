# config valid for current version and patch releases of Capistrano
lock "~> 3.10.1"
set :linked_files, %w{ config/secrets.yml }
set :application, "chat-space"
set :repo_url, "https://github.com/taniokatomoya/chat-space.git"

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.3.1'

set :ssh_options, auth_methods: ['publickey'],
                  keys: ['/Users/taniokatomoya/.ssh/taniokatomoya.pem']
                   # ※例：/Users/yusukeyamane/.ssh/key_pem.pem

set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end
