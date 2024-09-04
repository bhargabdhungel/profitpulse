"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Gift,
  Calendar,
  DollarSign,
  Award,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useSpring, useTransform } from "framer-motion";
import { selectedSaleAtom } from "@/store";
import { useRecoilValue } from "recoil";
import { NoDataState } from "@/utils/components/NoData";

const AnimatedCounter = ({ value }: { value: number }) => {
  const springValue = useSpring(0, { duration: 2000 });
  const displayValue = useTransform(springValue, Math.round);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return <motion.span>{displayValue}</motion.span>;
};

export default function RewardPage() {
  const [showDetails, setShowDetails] = useState(false);
  const selectedSale = useRecoilValue(selectedSaleAtom);
  if (!selectedSale) {
    return <NoDataState />;
  }

  const calculateDaysAgo = (date: string) => {
    const purchaseDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Button
          variant="ghost"
          className="mb-6 transition-colors duration-300 hover:bg-purple-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl overflow-hidden rounded-xl bg-white/10 shadow-2xl backdrop-blur-md"
      >
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <motion.div
            className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Gift className="h-32 w-32 text-white/80" />
          </motion.div>

          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-bold text-purple-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1>{selectedSale.brand} &apos;s product</h1>
            </motion.h2>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 text-pink-300">
                <Calendar className="h-4 w-4" />
                <span>
                  Purchased {calculateDaysAgo(selectedSale.purchaseDate)} days
                  ago
                </span>
              </div>
              <div className="flex items-center space-x-2 text-green-300">
                <DollarSign className="h-4 w-4" />
                <span>Amount: ₹{selectedSale.totalSales.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-300">
                <Award className="h-4 w-4" />
                <span>
                  Reward Points:{" "}
                  <AnimatedCounter value={selectedSale.rewardPoints} />
                </span>
              </div>
              <div className="flex items-center space-x-2 text-cyan-300">
                <Percent className="h-4 w-4" />
                <span>
                  Commission:{" "}
                  {(
                    (selectedSale.rewardPoints * 100) /
                    selectedSale.totalSales
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => setShowDetails(!showDetails)}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                {showDetails ? "Hide" : "Show"} Details
              </Button>
            </motion.div>
          </div>
        </div>

        {showDetails && (
          <motion.div
            className="bg-purple-800/50 p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-purple-300">
              Reward Details
            </h3>
            <p className="text-gray-300">
              You&apos;ve earned {selectedSale.rewardPoints} points on your
              purchase of {selectedSale.totalSales}. These points can be
              redeemed for exciting offers and discounts on future purchases.
            </p>
            <p className="mt-2 text-gray-300">
              The commission rate of{" "}
              {(
                (selectedSale.rewardPoints * 100) /
                selectedSale.totalSales
              ).toFixed(2)}
              % applies to the reward points, giving you an additional ₹
              {(
                (selectedSale.rewardPoints * 100) /
                selectedSale.totalSales /
                100
              ).toFixed(2)}{" "}
              in value.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
