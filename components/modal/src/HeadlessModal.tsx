/* eslint-disable react/display-name */
import React, { useState } from "react";
import {
	useOutsideClicker,
	useMountComponent as mountComponent,
	useClosableComponent as Closable,
} from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

function HeadlessModal(config: any, unmountDelay = 200, mountingNode?: any) {
	const ModalBase: any = React.forwardRef((props: any, ref: any) => {
		const visRef = useOutsideClicker(() => {
			setOpen(false);
			props.onAction(false);
		});
		const [open, setOpen] = useState(true);

		const defaultBackdropClasses =
			"fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center";

		const onRemoveAction = (payload: any) => {
			setOpen(false);
			props.onAction(payload);
		};

		return (
			<AnimatePresence>
				{open && (
					<motion.div
						key={"backdrop"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={twMerge(defaultBackdropClasses, props.backdropClasses)}
					>
						<motion.div
							key="modal-wrapper"
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 100 }}
							ref={visRef}
							className="relative"
						>
							{props.component({ ...props, onAction: onRemoveAction }, ref)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		);
	});
	if (config.timeout === undefined) {
		config.timeout = 0;
	}
	return mountComponent(
		Closable(ModalBase),
		unmountDelay,
		mountingNode,
	)(config);
}

export default HeadlessModal;
