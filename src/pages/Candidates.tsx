
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, Calendar } from "lucide-react";
import { useCandidates } from "@/hooks/useCandidates";
import PageLoader from "@/components/loading/PageLoader";
import { format } from "date-fns";

const Candidates = () => {
  const { candidates, loading } = useCandidates();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <PageLoader text="Loading candidates..." />;
  }

  const filteredCandidates = candidates.filter(candidate => {
    const fullName = `${candidate.first_name || ''} ${candidate.last_name || ''}`.toLowerCase();
    const email = candidate.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || email.includes(search);
  });

  const getInitials = (firstName: string | null, lastName: string | null) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'C';
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Candidates</h1>
          <p className="text-text-secondary">
            Manage and review candidate profiles
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-secondary border-border-dark text-text-primary"
            />
          </div>
        </div>

        {filteredCandidates.length === 0 ? (
          <Card className="bg-dark-secondary border-border-dark">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-text-secondary mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {searchTerm ? 'No candidates found' : 'No candidates registered'}
              </h3>
              <p className="text-text-secondary text-center">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Candidates will appear here once they register'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="bg-dark-secondary border-border-dark hover:border-tech-green/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.avatar_url || undefined} />
                      <AvatarFallback className="bg-tech-green text-dark-primary">
                        {getInitials(candidate.first_name, candidate.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-text-primary text-lg">
                        {candidate.first_name} {candidate.last_name}
                      </CardTitle>
                      <Badge variant="outline" className="border-tech-green text-tech-green mt-1">
                        Candidate
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm truncate">{candidate.email}</span>
                  </div>
                  
                  {candidate.phone && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{candidate.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Joined {format(new Date(candidate.created_at), 'PP')}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="bg-tech-green hover:bg-tech-green/90 text-dark-primary"
                    >
                      Schedule Interview
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-border-dark text-text-secondary hover:text-text-primary"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
