class PhotoGallery{
    constructor(){
        this.API_KEY = '563492ad6f91700001000001b07590a9c52f4c808b84e8442485a1e7';
        this.galleryDiv = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.logo = document.querySelector('.logo');
        this.pageIndex = 1;
        this.searchValueGlobal = '';
        this.eventHandle();
    }
    eventHandle(){
      document.addEventListener('DOMContentLoaded',()=>{
            this.getImg(1);
        });
        this.searchForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            this.pageIndex = 1;
            this.getSearchedImges(e);
           
        });
        this.loadMore.addEventListener('click',(e)=>{
            this.loadMoreImges(e);
        });
        this.logo.addEventListener('click', ()=>{
            this.pageIndex = 1;
            this.galleryDiv.innerHTML = '';
            this.getImg(this.pageIndex);
        })
    }
   async getImg(index){
    this.loadMore.setAttribute('data-img', 'curated');
        const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
       const data= await this.fetchImg(baseURL);
       this.generateHTML(data.photos);
        console.log(data);
    }
   async fetchImg(baseURL){
        const response = await fetch(baseURL, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;
    }
    generateHTML(photos){
        photos.forEach(photo =>{
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML= `
            <a href="${photo.src.original}" target="_blank">
            <img src="${photo.src.medium}">
            <h3>${photo.photographer}</h3>             
            </a>`;
            this.galleryDiv.appendChild(item);
        })
    }

   async getSearchedImges(e){
       this.loadMore.setAttribute('data-img', 'search');
       this.galleryDiv.innerHTML = '';
       const searchValue = e.target.querySelector('input').value;
       this.searchValueGlobal = searchValue;
       const baseURL =  `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
       const data= await this.fetchImg(baseURL);
       this.generateHTML(data.photos);
       e.target.reset();
    }
async getMoreSearchedImages(index){
   
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`;
    const data= await this.fetchImg(baseURL);
    console.log(data)
    this.generateHTML(data.photos);
}
loadMoreImges(e){
  let index = ++this.pageIndex;
 const loadMoreData = e.target.getAttribute('data-img');
 if(loadMoreData === 'curated'){
    //  load more 2 for curated
    this.getImg(index);
 }else{
    //  load more page 2 for search
    this.getMoreSearchedImages(index);
 }
}
}

const gallery = new PhotoGallery();