const root=document.getElementById('LightsOutApp');
if(root){
  const N=5,grid=root.querySelector('#lo-grid'),movesEl=root.querySelector('#lo-moves'),msg=root.querySelector('#lo-msg');
  let state=[],moves=0,cells=[];
  function flip(i){if(i>=0&&i<N*N)state[i]=!state[i];}
  function around(i){const r=Math.floor(i/N),c=i%N;flip(i);if(c>0)flip(i-1);if(c<N-1)flip(i+1);if(r>0)flip(i-N);if(r<N-1)flip(i+N);}
  function render(){state.forEach((v,i)=>cells[i].classList.toggle('on',v));movesEl.textContent='Moves: '+moves;}
  function play(i){around(i);moves++;render();msg.textContent=state.every(v=>!v)?('Solved in '+moves+' moves! 🎉'):'';}
  function build(){grid.innerHTML='';cells=[];for(let i=0;i<N*N;i++){const b=document.createElement('div');b.className='lo-cell';b.addEventListener('click',()=>play(i));grid.appendChild(b);cells.push(b);}}
  function newGame(){do{state=new Array(N*N).fill(false);const k=3+Math.floor(Math.random()*18);for(let n=0;n<k;n++)around(Math.floor(Math.random()*N*N));}while(state.every(v=>!v));moves=0;msg.textContent='';render();}
  root.querySelector('#lo-new').addEventListener('click',newGame);
  build();newGame();
}
