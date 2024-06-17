import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostItemProps {
	slug: string;
	title: string;
	description?: string;
	date: string;
	tags?: Array<string>;
	img: string; // Assuming path is still a string representing a URL or file path
	authors: Array<string>;
}

export function PostItem({
	slug,
	title,
	description,
	date,
	tags,
	img,
	authors,
}: PostItemProps) {
	return (
		<article className="flex flex-col gap-2 border-border border-b py-3">
			<div className="flex items-center">
				<Image
					src={img}
					alt="Post thumbnail"
					width={50}
					height={50}
					className="rounded-lg"
				/>

				<h2 className="text-2xl font-bold ml-2">
					<Link href={`/${slug}`}>{title}</Link>
				</h2>
			</div>
			<div className="flex gap-2">
				{tags?.map((tag) => (
					<Tag tag={tag} key={tag} />
				))}
			</div>
			<div className="flex gap-2 mt-0">
				{authors.map((author) => (
					<div key={author} className="flex flex-row items-center mt-0">
						<Avatar key={author}>
							<Link href={`https://github.com/${author}`}>
								<AvatarImage
									loading="eager"
									src={`https://github.com/${author}.png`}
								/>
								<AvatarFallback>
									{author.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Link>
						</Avatar>
					</div>
				))}
			</div>
			{description && (
				<div className="max-w-none text-muted-foreground">{description}</div>
			)}
			<div className="flex justify-between items-center">
				<dl>
					<dt className="sr-only">Published On</dt>
					<dd className="text-sm sm:text-base font-medium flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						<time dateTime={date}>{formatDate(date)}</time>
					</dd>
				</dl>
				<Link
					href={`/${slug}`}
					className={cn(buttonVariants({ variant: "link" }), "py-0")}
				>
					Read more →
				</Link>
			</div>
		</article>
	);
}
