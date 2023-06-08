const CategoryModel = require("../models/CategoryModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/user.model");

exports.createPost = async (req, res) => {
  const { body, category, subcategory, title } = req.body;

  const { username } = req.user;
  const author = req.user;

  try {
    const isSubExist = await CategoryModel.find({
      category: category,
      subcategory: subcategory,
    });
    if (isSubExist.length === 0) {
      throw new Error();
    }
    const post = await new PostModel({
      username,
      body,
      title,
      category,
      subcategory,
      author,
    });

    await post.save();
    const user = await UserModel.findOne({ username: post.username });
    user.submittedPosts.push(post._id);
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Post creado con éxito" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "No existe ninguna categoría como esa.",
    });
  }
};
exports.getAllPosts = async (req, res) => {
  const { sortType } = req.params;

  try {
    if (sortType === "popular") {
      const posts = await PostModel.find().sort({ vote: -1 });
      return res.status(200).json(posts);
    }
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
exports.getPopular = async (req, res) => {
  try {
    const { sortType } = req.params;
    console.log(sortType);
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
exports.vote = async (req, res) => {
  const { postId, voteType } = req.body;
  const user = req.user;

  try {
    const post = await PostModel.findById({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado." });
    }

    const alreadyVoted = post.votedBy.some(
      (obj) => obj.user === user._id.toString()
    );

    if (alreadyVoted) {
      if (post.votedBy.some((obj) => obj.voteType === voteType)) {
        if (voteType === "upvote") {
          post.vote -= 1;
        } else if (voteType === "downvote") {
          post.vote += 1;
        }
        const filter = {
          _id: post._id,
        };
        const update = {
          $pull: {
            votedBy: {
              user: user._id.toString(),
            },
          },
        };

        await PostModel.findByIdAndUpdate(filter, update);

        await post.save();
        res.status(200).json({ post, message: "Post actualizado." });
      } else {
        if (voteType === "upvote") {
          post.vote += 2;
        }
        if (voteType === "downvote") {
          post.vote -= 2;
        }

        const index = post.votedBy.findIndex(
          (element) => element.user === user._id.toString()
        );
        post.votedBy[index].voteType = voteType;
        await post.save();
        res.status(200).json({ post, message: "Post actualizado." });
      }
    } else {
      post.votedBy.push({ user: user._id, voteType: voteType });

      if (voteType === "upvote") {
        post.vote += 1;
      }
      if (voteType === "downvote") {
        post.vote -= 1;
      }

      await post.save();
      res.status(200).json({ post, message: "Post actualizado." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.savePost = async (req, res) => {
  const { postId } = req.body;
  const user = req.user;
  try {
    const post = await PostModel.findById({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado." });
    }
    if (user.savedPosts.includes(postId)) {
      const index = user.savedPosts.indexOf(postId);
      user.savedPosts.splice(index, 1);
      await user.save();
      return res.status(200).json({ user, message: "Se ha quitado el post de Guardados." });
    }
    user.savedPosts.push(postId);
    await user.save();
    res.status(200).json({ user, message: "Post guardado." });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { savedPosts } = req.user;
    res.status(200).json({ savedPosts: savedPosts });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
exports.getOnePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findById({ _id: postId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Post no encontrado." });
  }
};
exports.getOneSubCategory = async (req, res) => {
  const { subcategory } = req.params;
  try {
    const posts = await PostModel.find({ subcategory: subcategory });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: "Post no encontrado." });
  }
};
exports.getSavedPosts = async (req, res) => {
  const user = req.user;
  try {
    const postIds = user.savedPosts;
    const posts = await Promise.all(
      postIds.map((postId) => PostModel.findById(postId))
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: "Algo fue mal." });
  }
};
exports.getSubmittedPosts = async (req, res) => {
  const user = req.user;
  try {
    const postIds = user.submittedPosts;
    const posts = await Promise.all(
      postIds.map((postId) => PostModel.findById(postId))
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: "Algo fue mal." });
  }
};
exports.getSearchedPost = async (req, res) => {
  const { query } = req.params;

  try {
    const posts = await PostModel.find({
      $or: [
        { body: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });
    if (posts.length <= 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron resultados a: ${query}` });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
