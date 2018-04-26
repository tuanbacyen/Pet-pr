class AabmttController < ApplicationController
  before_action

  def index
    puts tinhmodto 88, 125, 82
  end

  def timptnd
    @soa = params[:soa].to_i
    @son = params[:son].to_i
    @check = params[:check].to_i
    if @check == 0
      result_to_view timamutrumot(@soa, @son)
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
      result_to_view temp
    end
  end

  def timbigmod
    @soxi = params[:sox].to_i
    @soai = params[:soa].to_i
    @son = params[:son].to_i
    result_to_view tinhmodto(@soxi, @soai, @son)
  end

  def timmod
    @soa = params[:soa].to_i
    @son = params[:son].to_i
    result_to_view tinhmod(@soa, @son)
  end

  private
  def result_to_view a
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

  def tinhmodto xi, ai, n
    x = xi
    a = ai
    d = 1
    while x != 0
      if x.odd?
        d = tinhmod d*a, n
      end
      x = (x / 2).to_i
      a = tinhmod (a*a), n
    end
    return d
  end

  def tinhmod a, m
    mod = a % m
    while (mod < 0)
      mod += m
    end
    return mod
  end
end
