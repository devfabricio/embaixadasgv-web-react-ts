import React from "react";
import {Post} from "../../../../models/Post";
import {PostInterface} from "../../../../interface/PostInterface";
import Markdown from 'markdown-to-jsx'
import he from 'he'

interface Props {
    post: PostInterface
}

const PostCard = (props: Props) => {

    let post = props.post
    let user_profile_img = ""
    let post_img = post.picture

    if(!!post.user.profile_img) {
        user_profile_img = post.user.profile_img
    }


    var decoder = new TextDecoder('utf-8')

    return(
        <div className={"post-card"}>
            <div className={"card-header"}>
                <div className={"user-info"}>
                    <img className={"profile-img"} src={user_profile_img} />
                    <span className={"profile-name"}>{post.user.name}</span>
                    <span className={"post-date"}>20 Set 2019 às 18:56</span>
                </div>
            </div>
            <div className={"card-body"}>
                {!!post_img && <img className={"post-img"} src={post_img} />}
                {post.type === "note" && <span className={"post-title"}>{post.title}</span>}
                {post.type === "thought" && <div className={"post-thought post-text"}>
                    <Markdown>
                        {he.decode(!!post.text ? post.text : "")}
                    </Markdown>
                </div>}
                {post.type === "post" && <div className={"post-picture post-text"}>
                    <Markdown>
                        {he.decode(!!post.text ? post.text : "")}
                    </Markdown>
                </div>}
                {post.type === "note" && <div className={"post-note post-text"}>
                    <Markdown>
                        {he.decode(!!post.text ? post.text : "")}
                    </Markdown>
                </div>}
            </div>
        </div>
    )
}

export default PostCard