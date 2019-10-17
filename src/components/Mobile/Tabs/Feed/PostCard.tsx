import React from "react";
import {Post} from "../../../../models/Post";
import {PostInterface} from "../../../../interface/PostInterface";
import Markdown from 'markdown-to-jsx'

interface Props {
    post: PostInterface
}

const PostCard = (props: Props) => {

    let post = props.post

    var decoder = new TextDecoder('utf-8')

    console.log(decodeURIComponent(!!post.text ? post.text : ""))
    return(
        <div className={"post-card"}>
            <div className={"card-header"}>
                <div className={"user-info"}>
                    <img className={"profile-img"} src={!!post.user.profile_img ? post.user.profile_img : ""} />
                    <span className={"profile-name"}>{post.user.name}</span>
                    <span className={"post-date"}>20 Set 2019 às 18:56</span>
                </div>
            </div>
            <div className={"card-body"}>
                <img className={"post-img"} src={!!post.picture ? post.picture : ""} />
                <span className={"post-title"}>{post.title}</span>
                <p className={"post-text"}>
                    <Markdown>
                        {decodeURIComponent(!!post.text ? post.text : "")}
                    </Markdown>
                </p>
            </div>
        </div>
    )
}

export default PostCard