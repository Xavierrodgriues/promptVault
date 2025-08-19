const promptModel = require("../models/prompt.model");

const getPersonal = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const count = await promptModel.countDocuments({
      type: "personal",
      ownerId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      count,
      message: "Personal prompts count fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching personal prompts count:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

const getCommunity = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const count = await promptModel.countDocuments({
      type: "community",
      ownerId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      count,
      message: "Community prompts count fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching community prompts count:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getRatio = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const communityCount = await promptModel.countDocuments({
      type: "community",
      ownerId: req.user._id,
    });

    const personalCount = await promptModel.countDocuments({
      type: "personal",
      ownerId: req.user._id,
    });

    const total = communityCount + personalCount;

    const ratio_community =
      total > 0 ? Math.round((communityCount / total) * 100) : 0;

    const ratio_personal =
      total > 0 ? Math.round((personalCount / total) * 100) : 0;

    return res.status(200).json({
      success: true,
      ratio_community,
      ratio_personal,
      message: "Prompts ratio fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching prompts ratio:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLast6MonthsStats = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Aggregate last 6 months grouped by type and month
    const stats = await promptModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)) // last 6 months (including current)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: { year: "$_id.year", month: "$_id.month" },
          counts: { $push: { type: "$_id.type", count: "$count" } }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format stats into { month, personal, community }
    const formattedStats = stats.map(entry => {
      const month = new Date(entry._id.year, entry._id.month - 1).toLocaleString("default", { month: "short" });
      const personal = entry.counts.find(c => c.type === "personal")?.count || 0;
      const community = entry.counts.find(c => c.type === "community")?.count || 0;
      return { month, personal, community };
    });

    // Generate last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const month = d.toLocaleString("default", { month: "short" });

      // Try to find data for this month, otherwise set 0
      const found = formattedStats.find(m => m.month === month);
      months.push(found || { month, personal: 0, community: 0 });
    }

    return res.status(200).json({
      success: true,
      data: months
    });
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getMonthlyTrends = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Aggregate last 6 months by month
    const stats = await promptModel.aggregate([
      {
        $match: {
          ownerId: req.user._id,
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)) // last 6 months
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          prompts: { $sum: 1 },
          // if you have tags array: count tags length
          tags: { $sum: { $size: { $ifNull: ["$tags", []] } } }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format results into { month, prompts, tags }
    const formattedStats = stats.map(entry => {
      const month = new Date(entry._id.year, entry._id.month - 1).toLocaleString("default", { month: "short" });
      return {
        month,
        prompts: entry.prompts,
        tags: entry.tags
      };
    });

    // Ensure all 6 months exist (fill with 0 if missing)
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const month = d.toLocaleString("default", { month: "short" });
      const found = formattedStats.find(m => m.month === month);
      months.push(found || { month, prompts: 0, tags: 0 });
    }

    return res.status(200).json({
      success: true,
      data: months
    });
  } catch (error) {
    console.error("Error fetching monthly trends:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getPersonal,
  getCommunity,
  getRatio,
  getLast6MonthsStats,
  getMonthlyTrends
}