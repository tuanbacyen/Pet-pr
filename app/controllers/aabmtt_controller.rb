class AabmttController < ApplicationController
  before_action

  def index
  end

  def timptnd
    @soa = params[:soa].to_i
    @son = params[:son].to_i
    @check = params[:check].to_i
    if @check == 0
      render_request_destroy timamutrumot(@soa, @son)
    else
      temp = []
      for i in 1...@son
        if UCLN(i, @son) == 1
          @kq = timamutrumot i, @son
          if @kq != 1
            temp.push("#{i}-#{@kq}")
          end
        end
      end
      render_request_destroy temp
    end
  end

  private
  def render_request_destroy a
    respond_to do |format|
      format.json  {
        render json: {
          data: a
        }
      }
    end
  end

  def timamutrumot a, n
    i = 1
    x = [n, a]
    bb = [0, 1]
    while(x[i] > 1)
      y = x[i-1] / x[i]
      x.push(x[i-1] - y*x[i])
      bb.push(bb[i-1] - y*bb[i])
      i = i + 1
    end
    kq = bb[i]
    if kq > 0
      return kq
    else
      return kq + n
    end
  end

  def UCLN a, b
    while(a != b)
      if(a > b)
        a = a - b
      else
        b = b - a
      end
    end
    return a
  end
end
