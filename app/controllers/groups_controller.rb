class GroupsController < ApplicationController

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
  end

  def edit
  end

  def update
  end

  private
  def group_params
  	params.require(:group).permit(:name, { :user_ids => []})
  end

end
