import{R as o}from"./index.b0846524.js";import{g as s}from"./index.17631ce7.js";const n=o("store",{state:()=>({foundPersonData:{},countOfPersons:0}),actions:{async getCurrentCountOfPersons(){this.countOfPersons=0;try{const t=await s();this.countOfPersons=t}catch(t){throw t}}}});export{n as u};
