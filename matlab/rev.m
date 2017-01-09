function [Rev]=rev(xti,pti,T)
    %rev=zeros(1,24)
    for i=1:24
    Rev(i)= xti(T,i)*pti(T,i);
    end 
end