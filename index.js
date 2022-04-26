const root = document.getElementsByClassName("root");
let arr=[],countarr=[];
const imageObjects= [...animalObjects]

const myFunction = function(e){
  if(!e.target.classList.contains("completed")){

    arr.push(e)
    turnBack(e)
    // Promise.resolve()
    // .then(function() { return animateLeave(e); })
  }
    
} 
function animateLeave(element) {
  return new Promise(function(resolve) {
    turnBack(element, function() {
      console.log("back done")
      validate();
      resolve();
    });
  });
}
const turnFront = (element)=>{
  const shape = element.target.children[0];
    gsap.to(shape, {duration: 1, rotationY: 180}).delay(1);
    gsap.to(element.target, {duration: 1, rotationY: 180,onComplete:showMessages}).delay(1);

}
function showMessages(){
 console.log("front done")
}
const turnBack = (element)=>{
    const shape = element.target.children[0];
    gsap.to(element.target, {duration: 1, rotationY: 0});
    gsap.to(shape, {duration: 1, rotationY: 0 });
    validate()  
}
const animationCompleted = ()=>{
  validate()
}
const validate = ()=>{
    if(arr.length === 2){

      if(arr[0].target.children[0]['alt'] !== arr[1].target.children[0]['alt'] ){
          turnFront(arr[0])
          turnFront(arr[1])
      }else{
        arr[0].target.classList.add("completed")
        arr[1].target.classList.add("completed")
      }
      arr = []
      let completedCount = document.getElementsByClassName("completed").length;
      if(completedCount==16){
        Swal.fire({
          title: 'You Won!',
          imageUrl: '../assets/victory.jpg',
          imageWidth: 500,
          imageAlt: 'Victory',
        })
      }
    }
}



Array.from(root).forEach(function(element) {
  let imageObjectsLen = imageObjects.length;
  let randomNumber = Math.floor(Math.random() * imageObjectsLen)
  element.children[0].alt=imageObjects[randomNumber]["imageText"]
  element.children[0].src=imageObjects[randomNumber]["imageUrl"]
  imageObjects.splice(randomNumber,1)
  element.addEventListener('click', myFunction);
});

