function [Fu]=fu(yu,pti,T)
    for i=1:24
    Fu(i)= yu(T,i)*pti(T,i);
    end
end