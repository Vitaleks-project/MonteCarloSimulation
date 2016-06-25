Rails.application.routes.draw do
  root to: 'home#index'
  get "example" => "home#example"
end
