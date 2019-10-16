import React from "react";

const PostCard = () => {
    return(
        <div className={"post-card"}>
            <div className={"card-header"}>
                <div className={"user-info"}>
                    <img className={"profile-img"} src={"https://firebasestorage.googleapis.com/v0/b/egv-app-f851e.appspot.com/o/images%2Fuser%2Fprofile%2Fbc613985-6f6f-479c-b3aa-9e2e6bec06e5.jpg?alt=media&token=94022c80-8027-4c45-8cfa-a1a60f7c5f03"} />
                    <span className={"profile-name"}>Fabrício Augusto</span>
                    <span className={"post-date"}>20 Set 2019 às 18:56</span>
                </div>
            </div>
            <div className={"card-body"}>
                <img className={"post-img"} src={"https://firebasestorage.googleapis.com/v0/b/egv-app-f851e.appspot.com/o/images%2Fpost%2Farticle%2F2ef11329-69fd-4457-ac3e-6d318dd877d9.jpg?alt=media&token=6acbb9b4-67d3-49ed-bed6-274c5585264d"} />
                <span className={"post-title"}>Um título de teste</span>
                <p className={"post-text"}>Um texto de teste</p>
            </div>
        </div>
    )
}

export default PostCard