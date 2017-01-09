clear;
tic 
N=30;%Days
t=24;%Hours
Rj=300;%%Capaity (USER CHOICE)

xti=zeros(N,t);%commitment decision%  USER CHOICE
yxt=zeros(N,t);%Actual commitment power flow
pti=zeros(N,t);%price per hour
yd=zeros(N,t);%energy loss energy loses
yu=zeros(N,t);%unmet power flow
yadd=zeros(N,t);%wind to storage  
yrem=zeros(N,t);%power from storge to commitment
vt=zeros(N,1);%value function of day ahead rewarding 
zt=zeros(N,t);%battery storage level per day 
ytotal=zeros(N,t);

% xti(commitment plower outflow to client decision)
%     ={zt(T+1,j+1)-zt(T+1,j+2)}(power volatility each hour)
%       yxt(T+1,i+1)+yadd(T+1,i+1)+yu(T+1,i+1)
%        (向消費者保證的每日每小時電流，加上新存入的風電，再加上無法達到保證的電量)
% 


%xti is the commit decision which involves battery net inflow plus unmet
%power flow 

for T=N:-1:1%forward days
for i=0:t-1%hours forward
yxt(T,i+1)=1000+randn;% 電力消費初始值設定，還需要找合理的真實資料
pti(T,i+1)=0.055+randn;% 電力價格初始值設定，還需要找合理的真實資料
    
    if T~=N
        yd(T+1,i+1)=0.01*yxt(T,i+1);% 能量耗損初始值設定，還需要找合理的真實資料
    end
    
    if T~=N 
        yu(T+1,i+1)=betarnd(2,5)*yu(T,i+1)+80*rand;%不能夠達成保證的電流量，前後期有random process
    end
yrem(T,i+1)=900+randn;%電池電力流出初始值設定，還需要找合理的真實資料

yadd(T,i+1)=max(900+200*randn,0);%風電充電初始值設定，還需要找合理的真實資料

%     s.b. constrain battery storage level 電池容量Rj
    if zt(T,i+1)>=0 && zt(T,i+1)<=Rj;
        if i~=t-1 
           zt(T,i+2)=zt(T,i+1)+(yadd(T,i+1)-yrem(T,i+1));
            if T~=1% 定義第一天最後一小時等於第二天第一小時電池容量
               zt(T,1)=zt(T-1,24)+(yadd(T-1,24)-yrem(T-1,24));
            end
       end
    end

    if zt(T,i+1)>Rj;
       zt(T,i+1)=Rj;%% constrain value to not to exceed Rj %%
    end
    if zt(T,i+1)<0;%% constrain value to not to lower than 0 %%
       zt(T,i+1)=0;
    end
    
    ytotal(T,i+1)=yxt(T,i+1)+yadd(T,i+1)+yu(T,i+1);
end
    if T~=N
    for j=0:t-2
      xti(T,j+1)=zt(T,j+1)-zt(T,j+2)+ytotal(T+1,j+2);
    end
    term=sum(rev(xti,pti,T)-fd(yd,pti,T+1)-fu(yu,pti,T+1),2);   
    end    
  if T==N
    vt(T)=0;      
  else
    vt(T)=max(term)+vt(T+1);   %%% define expectaiton %%
  end  
   
end

theta=diff(vt);
toc
figure(1);waterfall(vt)
figure(2);plot(theta)
figure(3);waterfall(zt)
figure(4);plot(vt)