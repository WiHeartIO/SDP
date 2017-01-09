
var days = 30;  // days
var hrs = 24; // hrs
var Rj = 300; // Battery Capacity Decision Making by user // USER CHOICE
var alpha = 2;
var beta = 5;
var variance = 200;

var xti = jStat.zeros(days, hrs); // commitment decision // USER CHOICE
var yxt = jStat.zeros(days, hrs); // commitment power flow
var pti = jStat.zeros(days, hrs); // price
var yd = jStat.zeros(days, hrs); // energy loss
var yu = jStat.zeros(days, hrs); // unmet
var yadd = jStat.zeros(days, hrs); // wind to storage 
var yrem = jStat.zeros(days, hrs); // power from storge to commitment
var zt = jStat.zeros(days, hrs); // storage level per day
var ytotal = jStat.zeros(days, hrs);
var term = jStat.zeros(days, 1);
var vt = []; // value function
var theta = [];


function dotmul(A, B, row, col){
    var result = jStat.zeros(row, col);
    for(var i = 0; i < row; i++){
        for(var j = 0; j < col; j++){
            result[i][j] = A[i][j] * B[i][j];
        }

    }
    return result;  
}

function dotmin(A, B, row, col){
    var result = [];
    for(var i = 0; i <= 23; i++)
        result.push(A[i] - B[i]);

    return result; 
}

function rev(xti, pti, day){    
    var Rev = [];
    for(var i=0; i<=23; i++)
        Rev.push(xti[day][i] * pti[day][i]);
    return Rev;
}

function fu(yu, pti, day){
    var Fu = [];
    for(var i=0; i<=23; i++)
        Fu.push(yu[day][i] * pti[day][i]);
    return Fu;
}

function fd(yd, pti, day){
    var Fd = [];
    for(var i=0; i<=23; i++)
        Fd.push(yd[day][i] * pti[day][i]); 
    return Fd;
}

function sdp(day, rj, alphaNew, betaNew, varianceNew, tag){
/* Check user input */
 if(tag == 1){
    days = day;
    Rj =rj;
    alpha = alphaNew;
    beta = betaNew;
    variance = varianceNew;
    xti = jStat.zeros(days, hrs); // commitment decision // USER CHOICE
    yxt = jStat.zeros(days, hrs); // commitment power flow
    pti = jStat.zeros(days, hrs); // price
    yd = jStat.zeros(days, hrs); // energy loss
    yu = jStat.zeros(days, hrs); // unmet
    yadd = jStat.zeros(days, hrs); // wind to storage 
    yrem = jStat.zeros(days, hrs); // power from storge to commitment
    zt = jStat.zeros(days, hrs); // storage level per day
    ytotal = jStat.zeros(days, hrs);
    term = jStat.zeros(days, 1);
    vt = [];
    theta = [];
 }

for(var T=days-1; T>=0; T--){       // days backward
    for( var i=0; i<=hrs-1; i++){   // hours backward
 
        yxt[T][i] = 1000 + parseFloat(jStat.rand(1));        
        pti[T][i] = 0.055 + parseFloat(jStat.rand(1));

        if(T != days-1){
            yd[T+1][i] = 0.01*yxt[T][i];
        }

        if(T != days-1)
            yu[T+1][i] = jStat.beta.sample(alpha, beta) * yu[T][i] + 80 * jStat.uniform.sample(0, 1);

        yrem[T][i] = 900 + parseFloat(jStat.rand(1));         
        yadd[T][i] = jStat.max([900 + variance*parseFloat(jStat.rand(1)), 0]);

        //s.b. constrain battery storage level
        if(zt[T][i] >= 0 && zt[T][i] <= Rj){
           if(i != hrs-1){
            zt[T][i+1] = zt[T][i] + (yadd[T][i] - yrem[T][i]);
            if(T != 0){    
                zt[T][0] = zt[T-1][23] + (yadd[T-1][23] - yrem[T-1][23]); 
            }
           }   
        }
        
        if(zt[T][i] > Rj){
           zt[T][i] = Rj;       // constrain value to not to exceed Rj 
        }
        
        if(zt[T][i] < 0){  // constrain value to not to exceed 0 
           zt[T][i] = 0;
        }
        
        ytotal[T][i] = yxt[T][i] + yadd[T][i] + yu[T][i];        
    }

    if(T != days-1){
        for(var j=0; j<=hrs-2; j++){
            xti[T][j] = zt[T][j] - zt[T][j+1] + ytotal[T+1][j+1];   
        }

        // formulation      
        var  r_d_u = dotmin(dotmin(rev(xti, pti, T), fd(yd, pti, T+1)), fu(yu, pti, T+1));
        term = jStat(r_d_u).sumrow();
    }
    

    if(T == days-1){        
        vt[T] = 0;
    }
    else {        
        vt[T] = term + vt[T+1]; // if use jStat.max() will return NaN
    }            
}
    theta = jStat.diff(vt);     

}