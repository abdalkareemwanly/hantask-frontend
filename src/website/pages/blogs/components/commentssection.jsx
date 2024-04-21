<section id="comments-section">
  <div className=" border border-gray-200 rounded-md p-4">
    <div
      className="cursor-pointer"
      onClick={() => setIsCommentsOpen(!isCommentsOpen)}
    >
      Comments
    </div>
    <div>
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            ref={commentsContainerRef}
            className="comments-container overflow-x-hidden overflow-y-auto p-4 max-h-[400px]"
          >
            {/* Your comments container content here */}
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                className={`bg-gray-100 p-3 rounded-md mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {comment.text}
              </motion.div>
            ))}
            {isLoading && <div className="loader">Loading...</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    {isUserLogin && (
      <div className="my-4 flex items-center gap-4">
        <input
          placeholder="comment..."
          type="text"
          className="input-box w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="w-[38px] h-[38px] rounded-full bg-greenColor text-white flex items-center justify-center">
          <BsFillSendFill size={22} />
        </button>
      </div>
    )}
  </div>
</section>;
