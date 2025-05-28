export function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* SellerSidebar will go here */}
            <div className="flex-1">
                {/* SellerHeader will go here */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
