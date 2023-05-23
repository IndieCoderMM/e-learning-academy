class ItemsController < ApplicationController
  def show
    # Retrieve the item details based on the provided item ID
    item = Item.find(params[:id])

    render json: item, status: :ok
  end
end
