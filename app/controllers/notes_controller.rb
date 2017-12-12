class NotesController < ApplicationController
  before_action :authenticate_user, only: [:index, :create, :update, :destroy]

  def index
    if current_user && Note.where(user_id: current_user.id)
      @notes = Note.where(user_id: current_user.id)
      render json: @notes, status: 200
    else
      render json: {errors: "You do not have any saved stories."}, status: 500
    end
  end

  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    if @note.save
      render json: @note, status: 201
    else
      render json: { errors: note.errors.full_messages }, status: 500
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
      render json: { errors: note.errors.full_messages }, status: 500
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @note.user_id == current_user.id
      @note.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.json { head :no_content }
      end
    end
  end

  private
  def note_params
    params.require(:note).permit(:name, :description, :link, :comments, :user_id)
  end

end
