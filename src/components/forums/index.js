import React, { useState } from 'react'
import Card from '../card'
import img from "../../assets/images/image 3.png"
import Modal from "../modal/index"

function ForumItem({ item }) {
    const [edit, setEdit] = useState(false);
    const [forumItem, upateForumItem] = useState({
        name: item.name,
        description: item.description,
        image: item.image
    })
    const handleChange = (e) => {
        upateForumItem({
            ...forumItem, [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div style={{ lineHeight: "normal" }} className="mb-1  d-flex justify-content-between align-items-center">
                <div className="profile-thumbnail mb-4" >
                    <img src={item.profile} alt="user profile" />
                </div>
                <div className="flex-grow-1">
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">{item.description}</small>
                </div>
                <div>
                    <span onClick={() => setEdit(true)} className="material-icons text-primary mb-3 btn fs-4">
                        edit
                    </span>
                    <span className="material-icons text-danger">
                        delete
                    </span>
                </div>
            </div><hr />
            {edit &&

                <Modal title="Edit Forum" closeModal={() => setEdit(false)}>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Forum Name</label>
                            <input value={forumItem.name} type="text" class="form-control" id="name" placeholder="forum name"
                                name="name" onChange={handleChange} />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea value={forumItem.description} class="form-control" id="description" rows="3"
                                name="description" onChange={handleChange} />
                        </div>
                        <div class="mb-3">
                            <label for="file" class="form-label">Photo</label>
                            <input type="file" class="form-control" id="file" placeholder="forum name" />
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}

export default function Forums() {
    const forumItem = {
        profile: img,
        description: "Well, the way they make shows is, they make one show ",
        name: "HIV & AIDS",

    }
    const [createForum, setCreateForum] = useState(false);

    return (
        <>
            <Card title="Forums">
                <ForumItem item={forumItem} />
                <ForumItem item={forumItem} />
                <div>
                    <button onClick={() => setCreateForum(true)} className="btn btn-primary fs-6 py-1">
                        Add New
                    </button>
                </div>
            </Card>
            {createForum &&
                <Modal title="Create Forum" closeModal={() => setCreateForum(false)}>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Forum Name</label>
                            <input type="text" class="form-control" id="name" placeholder="forum name" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" rows="3" />
                        </div>
                        <div class="mb-3">
                            <label for="file" class="form-label">Photo</label>
                            <input type="file" class="form-control" id="file" placeholder="forum name" />
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}
