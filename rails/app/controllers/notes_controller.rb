class NotesController < ApplicationController
  def index
    @notes = Note.all
    render json: @notes
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: 201
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.save
    render json: @note
  end



  private
  def note_params
    params.require(:note).permit(:name, :description)
  end

end