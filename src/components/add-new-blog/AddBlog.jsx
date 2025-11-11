import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const AddBlog = (props) => {
    const {openDialog, setOpenDialog, loading, blogFormData, setBlogFormData, handleSaveData} = props;

    return (
        <Fragment>
            <div>
                <Button className="cursor-pointer" onClick={() => setOpenDialog((prev) => !prev)}>
                    Add New Blog
                </Button>
            </div>
            <Dialog
                open={openDialog}
                onOpenChange={() => {
                    setOpenDialog((prev) => !prev)
                    setBlogFormData({
                        title: "",
                        description: "",
                    })
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Add New Blog
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Enter blog title"
                                value={blogFormData.title}
                                onChange={(event) => 
                                    setBlogFormData({
                                        ...blogFormData,
                                        title: event.target.value,
                                    })
                                }
                                id="title"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                type="textarea"
                                name="description"
                                placeholder="Enter description"
                                value={blogFormData.description}
                                onChange={(event) => 
                                    setBlogFormData({
                                        ...blogFormData,
                                        description: event.target.value
                                    })
                                }
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveData} type="button">
                            {loading ? "Saving changes" : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default AddBlog;