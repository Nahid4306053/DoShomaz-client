export const getMarkedBlog = () =>{
       if(localStorage.getItem('markedBlog')){
          const data = localStorage.getItem('markedBlog')
          return JSON.parse(data);
       }
       else{
          localStorage.setItem('markedBlog','[]');   
          return [];
       }
}

export const AddMarkedBlogItem = (id) =>{
       const oldata = getMarkedBlog();
             oldata.push(id);
             console.log(id,oldata);
       localStorage.setItem('markedBlog',JSON.stringify(oldata));
} 

export const DeleteMarkedBlog = (id) =>{
       const oldata = getMarkedBlog();

       const newData = oldata.filter(ele=> ele !== id)        
        localStorage.setItem('markedBlog',JSON.stringify(newData));                 
}

