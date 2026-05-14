import { useEffect, useRef, useState } from "react";

const COLOR_MAP = {
    amber: {
        title: "text-amber-500",
        icon: "text-amber-400",
        bar: "bg-amber-500",
        barBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    blue: {
        title: "text-blue-500",
        icon: "text-blue-400",
        bar: "bg-blue-500",
        barBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    green: {
        title: "text-green-500",
        icon: "text-green-400",
        bar: "bg-green-500",
        barBg: "bg-green-100 dark:bg-green-900/30",
    },
};

function useCountUp(target, duration = 900, startDelay = 0) {
    const [value, setValue] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        if (target === 0) {
            setValue(0);
            return;
        }

        let timeoutId = setTimeout(() => {
            const startTime = performance.now();

            function tick(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out quadratic
                const eased = 1 - (1 - progress) * (1 - progress);
                setValue(Math.round(eased * target));

                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(tick);
                }
            }

            rafRef.current = requestAnimationFrame(tick);
        }, startDelay);

        return () => {
            clearTimeout(timeoutId);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration, startDelay]);

    return value;
}

export default function StatTile({
    title,
    myCount,
    totalCount,
    color = "blue",
    icon: Icon,
    delay = 0,
}) {
    const colors = COLOR_MAP[color] ?? COLOR_MAP.blue;

    // Entrance animation state
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => setVisible(true), delay + 50);
        return () => clearTimeout(id);
    }, [delay]);

    // Progress bar animation — starts slightly after entrance
    const [barReady, setBarReady] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => setBarReady(true), delay + 200);
        return () => clearTimeout(id);
    }, [delay]);

    const animatedMy = useCountUp(myCount, 900, delay + 100);
    const animatedTotal = useCountUp(totalCount, 900, delay + 100);

    const percent =
        totalCount > 0 ? Math.round((myCount / totalCount) * 100) : 0;

    return (
        <div
            className={[
                "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg",
                "group cursor-default",
                "transition-all duration-500 ease-out",
                "hover:scale-105 hover:shadow-lg",
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
            ].join(" ")}
        >
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {/* Title row */}
                <div className="flex items-center gap-2">
                    {Icon && (
                        <Icon
                            className={`w-6 h-6 shrink-0 ${colors.icon}`}
                            aria-hidden="true"
                        />
                    )}
                    <h3 className={`text-2xl font-semibold ${colors.title}`}>
                        {title}
                    </h3>
                </div>

                {/* Count display */}
                <p className="mt-4 text-xl" aria-describedby={`stat-label-${title}`}>
                    <span className="mr-2 tabular-nums">{animatedMy}</span>
                    <span className="text-gray-400">/</span>
                    <span className="ml-2 tabular-nums">{animatedTotal}</span>
                </p>

                {/* Sub-label */}
                <p id={`stat-label-${title}`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    My tasks / Total tasks
                </p>

                {/* Progress bar */}
                <div className={`mt-4 h-2 rounded-full ${colors.barBg}`}>
                    <div
                        className={`h-2 rounded-full ${colors.bar} transition-[width] duration-700 ease-out`}
                        style={{ width: barReady ? `${percent}%` : "0%" }}
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${percent}% of total ${title.toLowerCase()} are yours`}
                    />
                </div>
                <p className="mt-1 text-xs text-right text-gray-400">
                    {percent}%
                </p>
            </div>
        </div>
    );
}
