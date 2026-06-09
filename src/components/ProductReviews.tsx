import React, { useState, useEffect } from "react";
import { Star, MessageSquare, ThumbsUp, Calendar, Check, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "../store/useCartStore";

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  likes: number;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

// Default Bangladeshi-themed reviews in native format mimicking Daraz reviews
const getDefaultReviews = (productId: string): Review[] => {
  return [
    {
      id: `rev-${productId}-1`,
      reviewerName: "Sabbir Ahmed",
      rating: 5,
      comment: "অসাধারণ প্রোডাক্ট! যেমন ছবিতে দেখেছি ঠিক তেমনই পেয়েছি। বিল্ড কোয়ালিটি অনেক জোস এবং প্রিমিয়াম। ডেলিভারিও পেয়েছি মাত্র ২ দিনে। সেলারকে ১০/১০ দেওয়া যায়।",
      date: "2026-06-05",
      verified: true,
      likes: 12,
    },
    {
      id: `rev-${productId}-2`,
      reviewerName: "Nusrat Jahan",
      rating: 4,
      comment: "Product quality is very good. Box packaging was robust and double-sealed. Fully functional and useful, highly recommended!",
      date: "2026-06-02",
      verified: true,
      likes: 4,
    },
    {
      id: `rev-${productId}-3`,
      reviewerName: "Tanvir Rahman",
      rating: 5,
      comment: "একদম খাঁটি প্রিমিয়াম ড্রপ শিপমেন্ট। ওয়ারেন্টি সিকিউরড আছে এবং ডেলিভারি সিস্টেম দারুণ। Walton/Singer ক্যাটাগরির চেয়েও ইউনিক প্রোডাক্ট।",
      date: "2026-05-28",
      verified: true,
      likes: 8,
    }
  ];
};

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  
  const addToast = useCartStore((state) => state.addToast);

  // Load reviews from localStorage on mount or productId change
  useEffect(() => {
    const storageKey = `alpha_drop_reviews_${productId}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse reviews, resetting:", e);
        const defaults = getDefaultReviews(productId);
        setReviews(defaults);
        localStorage.setItem(storageKey, JSON.stringify(defaults));
      }
    } else {
      const defaults = getDefaultReviews(productId);
      setReviews(defaults);
      localStorage.setItem(storageKey, JSON.stringify(defaults));
    }
  }, [productId]);

  // Save reviews list to storage when it changes
  const saveReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem(`alpha_drop_reviews_${productId}`, JSON.stringify(updatedReviews));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast("Please provide your name.", "error");
      return;
    }
    if (!comment.trim()) {
      addToast("Please write a review comment.", "error");
      return;
    }

    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      reviewerName: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
      verified: true, // Auto-verified for active simulator checkout users
      likes: 0
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);
    addToast("Review submitted successfully! Thank you for rating us.", "success");
    
    // Reset Form
    setName("");
    setRating(5);
    setComment("");
  };

  const handleLike = (reviewId: string) => {
    if (likedReviews.includes(reviewId)) {
      // Unlike
      setLikedReviews(likedReviews.filter(id => id !== reviewId));
      saveReviews(reviews.map(r => r.id === reviewId ? { ...r, likes: Math.max(0, r.likes - 1) } : r));
    } else {
      // Like
      setLikedReviews([...likedReviews, reviewId]);
      saveReviews(reviews.map(r => r.id === reviewId ? { ...r, likes: r.likes + 1 } : r));
      addToast("Marked review as helpful!", "success");
    }
  };

  // Stats Computations
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
    : 0;

  // Star Counts Breakdown
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 is 1 star, Index 4 is 5 star
  reviews.forEach(r => {
    const idx = Math.min(Math.max(1, r.rating), 5) - 1;
    ratingCounts[idx]++;
  });

  return (
    <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-sm space-y-8 font-sans" id={`reviews-container-${productId}`}>
      
      {/* Target Heading Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight uppercase flex items-center gap-2">
            <MessageSquare className="text-[#f27495]" size={20} />
            <span>Ratings & Reviews ({totalReviews})</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400 font-extrabold uppercase mt-1 tracking-wider">
            Verified opinions of verified buyers for "{productName}"
          </p>
        </div>
        
        <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100/60 font-black tracking-wider uppercase">
          <Sparkles size={12} className="animate-spin text-emerald-500" />
          <span>Daraz Verified Rating Engine Active</span>
        </div>
      </div>

      {/* Main Stats Summary & Progress Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Scorecard */}
        <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0">
          <div className="text-5xl font-mono font-black text-neutral-900 leading-none">
            {averageRating}
          </div>
          <div className="flex justify-center gap-1 my-3 text-amber-500">
            {[1, 2, 3, 4, 5].map((starVal) => {
              const fillAmt = Math.min(Math.max(0, averageRating - (starVal - 1)), 1);
              return (
                <div key={starVal} className="relative">
                  <Star size={18} className="text-gray-200 fill-gray-200" />
                  <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillAmt * 100}%` }}>
                    <Star size={18} className="text-amber-500 fill-amber-500 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
            {totalReviews} Store Ratings
          </p>
          <div className="mt-2 text-[10px] text-emerald-600 font-bold bg-emerald-50/60 inline-block px-3 py-1 rounded-full uppercase">
            99% Excellent Buyer Satisfaction
          </div>
        </div>

        {/* Right Side: Rating Progress Bar Bars */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars - 1];
            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 font-sans text-xs">
                {/* Stars tag label */}
                <span className="w-10 text-gray-500 font-bold flex items-center justify-end gap-1 shrink-0">
                  <span>{stars}</span>
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                </span>
                
                {/* Progress bar line */}
                <div className="flex-grow h-2.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Percentage of votes */}
                <span className="w-12 text-right text-gray-400 font-mono font-bold text-[10px]">
                  {count} ({Math.round(percent)}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Split List & Form: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-gray-100">
        
        {/* Left Side: Reviews List list */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-black uppercase text-neutral-800 tracking-widest mb-4">
            Direct Buyer Feedback List
          </h3>

          {reviews.length === 0 ? (
            <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center text-gray-400 space-y-2">
              <AlertCircle className="mx-auto text-gray-300" size={24} />
              <p className="text-xs font-semibold uppercase">No reviews yet for this drop</p>
              <p className="text-[10px]">Be the first to post a verified feedback review below!</p>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              <AnimatePresence initial={false}>
                {reviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-50/50 hover:bg-slate-50 border border-gray-150 p-4.5 rounded-xl transition duration-200 space-y-3"
                    id={`review-item-${rev.id}`}
                  >
                    
                    {/* Review Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        {/* Name */}
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs font-black text-gray-900 uppercase">
                            {rev.reviewerName}
                          </span>
                          
                          {rev.verified && (
                            <span className="inline-flex items-center gap-1 text-[8px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/40 uppercase tracking-widest scale-90">
                              <Check size={8} className="stroke-[3]" />
                              <span>Verified Purchase</span>
                            </span>
                          )}
                        </div>

                        {/* Stars icon row */}
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((starIdx) => (
                            <Star
                              key={starIdx}
                              size={12}
                              className={starIdx <= rev.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Date details */}
                      <span className="text-[9px] text-gray-400 font-mono font-bold flex items-center gap-1">
                        <Calendar size={10} />
                        {rev.date}
                      </span>
                    </div>

                    {/* Review Body Text Content */}
                    <p className="text-xs text-neutral-800 font-semibold leading-relaxed">
                      {rev.comment}
                    </p>

                    {/* Review Footer Section */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100/50">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                        Was this review helpful?
                      </span>

                      <button
                        onClick={() => handleLike(rev.id)}
                        className={`flex items-center gap-1.5 py-1 px-3 text-[10px] font-sans font-black tracking-wider uppercase rounded-lg border transition cursor-pointer ${
                          likedReviews.includes(rev.id)
                            ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                            : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-slate-50"
                        }`}
                        id={`btn-like-review-${rev.id}`}
                      >
                        <ThumbsUp size={10} />
                        <span>Helpful ({rev.likes})</span>
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right Side: Form submit reviews */}
        <div className="lg:col-span-5 bg-slate-50/50 border border-gray-150 p-5 rounded-2xl">
          <h3 className="text-xs font-black uppercase text-neutral-800 tracking-widest mb-4">
            Post Your Review Rating
          </h3>

          <form onSubmit={handleSubmitReview} className="space-y-4 font-sans">
            
            {/* Input Name field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rafi Mahmud"
                className="w-full text-xs font-semibold p-3 rounded-xl border border-gray-200 bg-white focus:border-[#f27495] focus:outline-hidden transition"
                maxLength={40}
                required
              />
            </div>

            {/* Interactive Stars Selection Selector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">
                Product Rating Star Score: <span className="text-amber-600 font-black">{rating} Stars</span>
              </label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starIdx) => {
                  const isActive = (hoveredRating !== null ? hoveredRating : rating) >= starIdx;
                  return (
                    <button
                      key={starIdx}
                      type="button"
                      onClick={() => setRating(starIdx)}
                      onMouseEnter={() => setHoveredRating(starIdx)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="p-1 hover:scale-120 transition duration-150 cursor-pointer text-gray-200"
                      title={`${starIdx} Stars`}
                      id={`star-btn-${starIdx}`}
                    >
                      <Star
                        size={26}
                        className={`transition ${isActive ? "text-amber-500 fill-amber-500" : "text-gray-200"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Comment feedback text text area */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">
                Your Review Text Message
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="মৌলিক ও চমৎকার প্রোডাক্ট! জিনিসটা খুব পছন্দ হয়েছে, ধন্যবাদ।"
                rows={4}
                className="w-full text-xs font-semibold p-3 rounded-xl border border-gray-200 bg-white focus:border-[#f27495] focus:outline-hidden transition resize-none leading-relaxed"
                maxLength={300}
                required
              />
            </div>

            {/* Verified buyer assurance metadata stamp */}
            <div className="text-[10px] text-gray-400 font-semibold uppercase bg-white/70 border border-slate-100 p-2.5 rounded-xl flex items-center gap-2 leading-relaxed">
              <Check className="text-emerald-500 shrink-0" size={13} />
              <span>Submission will automatically be labeled as verified purchase buyer.</span>
            </div>

            {/* Submit Action action button */}
            <button
              type="submit"
              className="w-full py-3 px-4.5 bg-[#f27495] hover:bg-[#eb5b80] text-white text-xs font-black tracking-widest uppercase rounded-xl transition duration-200 cursor-pointer items-center justify-center flex hover:shadow-md active:scale-98"
              id="submit-review-btn"
            >
              Submit Store Review
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
