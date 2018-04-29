class AabmttController < ApplicationController
  before_action

  def index
  end

  def timptnd
    @soa = params[:soa].to_i
    @son = params[:son].to_i
    @check = params[:check].to_i
    if @check == 0
      result_to_view timamutrumot @soa, @son
    else
      temp = []
      for i in 1...@son
        if UCLN(i, @son) == 1
          @kq = timamutrumot(i, @son)[0]
          if @kq != 1
            temp.push("#{i}-#{@kq}")
          end
        end
      end
      result_to_view [temp,0,0]
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
    result_to_view [tinhmod(@soa, @son),0,0]
  end

  private
  def result_to_view a
    respond_to do |format|
      format.json  {
        render json: {
          data: a[0],
          x: a[1],
          b: a[2]
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
    unless kq > 0
      kq += n
    end
    return [kq, x, bb]
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
    x1 = [xi]
    a = ai
    a1 = [ai]
    d = 1
    d1 = [d]
    while x != 0
      if x.odd?
        d = tinhmod d*a, n
      end
      d1.push(d)
      x = (x / 2).to_i
      a = tinhmod (a*a), n
      x1.push(x)
      a1.push(a)
    end
    return [d1,x1,a1]
  end

  def tinhmod a, m
    mod = a % m
    while (mod < 0)
      mod += m
    end
    return mod
  end
end
