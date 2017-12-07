class NotesController < ApplicationController
  before_action :authenticate_user

  def index
    if current_user
      user = User.find_by(:id => params[:user_id].to_i)
      @notes = user.notes.all
      render json: @notes, status: 200
    else
      redirect_to "/login"
      render json: { errors: @notes.errors.full_messages }, status: 500
    end
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: 201
    else
      render json: { errors: @note.errors.full_messages }, status: 500
    end
  end

  def update
    if current_user
      @note = Note.find(params[:id])
      @note.update(comments: @note.comments.push(params[:note][:comments]))
      @note.save
      render json: @note
    else
      redirect "/login"
      render json: { errors: @notes.errors.full_messages }, status: 500
    end
  end



  private
  def note_params
    params.require(:note).permit(:name, :description, :link, :comments, :user_id)
  end

end
