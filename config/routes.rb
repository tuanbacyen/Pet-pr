Rails.application.routes.draw do
  get "aabmtt", to: "aabmtt#index", as: "atbmtt"
  post "timptnd", to: "aabmtt#timptnd", as: "timptnd"
  post "timbigmod", to: "aabmtt#timbigmod", as: "timbigmod"
  post "timmod", to: "aabmtt#timmod", as: "timmod"

  get "home/index"

  root "home#index"
end
