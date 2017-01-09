function [Fd]=fd(yd,pti,T)
    for i=1:24
    Fd(i)= yd(T,i)*pti(T,i);
    end
end