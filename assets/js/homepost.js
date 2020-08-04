// {
//         let createpost=function(){
//                let newpostform=$('#new-post-form');
//                newpostform.submit(function(e){
//                        e.preventDefault();
//                        $.ajax({
//                                type:'post',
//                                url:'/post/create-post',
//                                data:newpostform.serialize(),
//                                success: function(data){
//                                        let newPost=newpostdom(data.data.post);
//                                        $('#post-list-cont>ol').prepend(newPost);
//                                        deletePost($(` .delete-post-button`,newPost));
//                                 //        console.log(data);
//                                },error:function(error){
//                                        console.log(error.responseText);
//                                }
//                        })
//                });
//         } 
//         let newpostdom=function(post){
//                 return $(`  
//                 <li id="post-${post._id}">
//                         <a class="delete-post-button" href="/post/destroy/${post._id}">x</a>
//                 <p>
//                 ${ post.content}
//                 <br>
//                 ${ post.user.name}
//                 </p>
//             </li>
//             <form action="/post/create-comment" method="POST">
//                 <input name="content" type="text" placeholder=" Comment " >
//                 <input name="post" type="hidden" value=" ${post._id}">
//                 <input type="submit" value=" Comment ">
//             </form>
//             <div class="post-comments-list">
//                 <ul id="post-comments-${ post._id }">
                
//                 </ul>
//             </div>
//             `)
//         }
//         let deletePost=function(deletelink){
//                 $(deletelink).click(function(e){
//                         e.preventDefault();
//                         $.ajax({
//                                 type : 'get',
//                                 url : $(deletelink).prop('href'),
//                                 success: function(data){
//                                         $(`#post-${data.data.post_id}`).remove();
//                                 },error:function(error){
//                                         console.log(error.responseText);
//                                 }
//                         });
//                 })
//         }
//         createpost();  
// }
