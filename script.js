const products=[
{id:1,name:"Aureon",price:24999,img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=85",desc:"A refined stainless-steel timepiece with a clean, confident silhouette.",spec:["42mm case","Steel body","Quartz movement","5 ATM water resistant"]},
{id:2,name:"Nocturne",price:28999,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85",desc:"A dark, elegant dial designed for evening wear and everyday confidence.",spec:["40mm case","Steel body","Automatic movement","5 ATM water resistant"]},
{id:3,name:"Meridian",price:21999,img:"https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=85",desc:"Minimal proportions and a timeless dial make Meridian an everyday essential.",spec:["41mm case","Steel body","Quartz movement","3 ATM water resistant"]},
{id:4,name:"Eclipse",price:31999,img:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=85",desc:"A bold statement piece balancing modern geometry with classic watchmaking.",spec:["43mm case","Steel body","Automatic movement","5 ATM water resistant"]},
{id:5,name:"Regent",price:26999,img:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=85",desc:"Polished details and a balanced dial for formal occasions and daily wear.",spec:["41mm case","Steel body","Quartz movement","3 ATM water resistant"]},
{id:6,name:"Atlas",price:29999,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",desc:"A versatile modern classic with a strong wrist presence.",spec:["42mm case","Steel body","Automatic movement","5 ATM water resistant"]}
];
let cart=JSON.parse(localStorage.getItem("zennithCart")||"[]"), orders=JSON.parse(localStorage.getItem("zennithOrders")||"[]");
const $=s=>document.querySelector(s), money=n=>"Rs. "+n.toLocaleString();
function renderProducts(){const box=$("#products");box.innerHTML=products.map(p=>`<article class="product"><img class="product-img" src="${p.img}" alt="${p.name} watch"><div class="product-body"><h3>${p.name}</h3><div class="price">${money(p.price)}</div><small>${p.desc}</small><div class="product-actions"><button class="mini-btn details" data-id="${p.id}">View Details</button><button class="mini-btn add" data-id="${p.id}">Add to Cart</button></div></div></article>`).join("")}
function saveCart(){localStorage.setItem("zennithCart",JSON.stringify(cart));renderCart();$("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});saveCart();toast("Added to cart")}
function renderCart(){const box=$("#cartItems");if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p>';$("#cartTotal").textContent="Rs. 0";return}let total=0;box.innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cart-row"><img src="${p.img}" alt="${p.name}"><div><b>${p.name}</b><br><small>${money(p.price)} × ${i.qty}</small></div><button class="mini-btn remove" data-id="${p.id}">Remove</button></div>`}).join("");$("#cartTotal").textContent=money(total)}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function openProduct(id){const p=products.find(x=>x.id===id);$("#modalImg").src=p.img;$("#modalImg").alt=p.name;$("#modalName").textContent=p.name;$("#modalPrice").textContent=money(p.price);$("#modalDesc").textContent=p.desc;$("#modalSpecs").innerHTML=p.spec.map(s=>`<span>${s}</span>`).join("");$("#modalAdd").dataset.id=id;$("#productModal").classList.add("open")}
renderProducts();saveCart();
document.addEventListener("click",e=>{if(e.target.matches(".add"))add(+e.target.dataset.id);if(e.target.matches(".details"))openProduct(+e.target.dataset.id);if(e.target.matches(".remove")){cart=cart.filter(i=>i.id!==+e.target.dataset.id);saveCart()}if(e.target.matches("[data-close]"))e.target.closest(".modal").classList.remove("open")});
$("#modalAdd").onclick=()=>{add(+$("#modalAdd").dataset.id);$("#productModal").classList.remove("open")};
$("#cartBtn").onclick=()=>$("#cartDrawer").classList.add("open");$("#closeCart").onclick=()=>$("#cartDrawer").classList.remove("open");
$("#checkoutBtn").onclick=()=>{if(!cart.length)return toast("Your cart is empty");$("#cartDrawer").classList.remove("open");$("#checkoutModal").classList.add("open")};
$("#checkoutForm").onsubmit=e=>{e.preventDefault();let total=cart.reduce((a,i)=>a+products.find(p=>p.id===i.id).price*i.qty,0);orders.push({id:"ZN"+Date.now().toString().slice(-6),total});localStorage.setItem("zennithOrders",JSON.stringify(orders));cart=[];saveCart();$("#checkoutModal").classList.remove("open");toast("Order placed — demo payment/order flow complete")};
$("#contactForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Message sent successfully")};
$("#themeBtn").onclick=()=>{let dark=document.documentElement.dataset.theme!=="dark";document.documentElement.dataset.theme=dark?"dark":"light";localStorage.setItem("zennithTheme",dark?"dark":"light");$("#themeBtn").textContent=dark?"☀":"☾"};
if(localStorage.getItem("zennithTheme")==="dark"){$("#themeBtn").click()}
$("#menuBtn").onclick=()=>$("#navLinks").classList.toggle("open");
$("#showAll").onclick=()=>document.querySelector("#collection").scrollIntoView();
$("#adminLink").onclick=e=>{e.preventDefault();$("#adminOrders").textContent=orders.length;$("#adminSales").textContent=money(orders.reduce((a,o)=>a+o.total,0));$("#adminModal").classList.add("open")};
$("#adminClose").onclick=()=>$("#adminModal").classList.remove("open");
