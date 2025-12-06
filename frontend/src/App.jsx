import { useState, useEffect } from 'react';
import { Sparkles, FileText, Users, TrendingUp, Mail, CheckCircle, AlertCircle, Send, Zap, Award, DollarSign, Clock, Shield, ArrowRight, Star, TrendingDown } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [rfpInput, setRfpInput] = useState('');
  const [structuredRFP, setStructuredRFP] = useState(null);
  const [vendors, setVendors] = useState([
    { id: '1', name: 'TechCorp Solutions', email: 'sales@techcorp.com', rating: 4.8, deals: 156 },
    { id: '2', name: 'Global IT Supplies', email: 'quotes@globalit.com', rating: 4.6, deals: 203 },
    { id: '3', name: 'Premier Electronics', email: 'rfp@premierelec.com', rating: 4.9, deals: 98 },
    { id: '4', name: 'Digital Hardware Inc', email: 'sales@digitalhw.com', rating: 4.7, deals: 145 }
  ]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCreateRFP = () => {
    if (!rfpInput.trim()) {
      showNotification('Please enter RFP requirements', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const rfp = {
        id: Date.now().toString(),
        title: 'Office Equipment Procurement',
        description: 'AI-parsed procurement request',
        budget: 50000,
        items: [
          { type: 'Laptops', quantity: 20, specs: '16GB RAM, Intel i7, 512GB SSD' },
          { type: 'Monitors', quantity: 15, specs: '27-inch 4K IPS Display' }
        ],
        deliveryDeadline: '30 days',
        paymentTerms: 'Net 30',
        warrantyRequirement: '1 year minimum'
      };
      setStructuredRFP(rfp);
      setLoading(false);
      showNotification('🎉 RFP created successfully with AI!', 'success');
      setTimeout(() => setActiveTab('vendors'), 500);
    }, 2000);
  };

  const handleSendRFP = () => {
    if (selectedVendors.length === 0) {
      showNotification('Please select at least one vendor', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const mockProposals = selectedVendors.map((vId, idx) => {
        const vendor = vendors.find(v => v.id === vId);
        return {
          id: `prop-${idx}`,
          vendorId: vId,
          vendorName: vendor.name,
          vendorRating: vendor.rating,
          totalPrice: 45000 + (idx * 3500),
          itemPrices: [
            { item: 'Laptops', price: 2100 + (idx * 150), qty: 20 },
            { item: 'Monitors', price: 350 + (idx * 25), qty: 15 }
          ],
          deliveryTime: `${25 + (idx * 3)} days`,
          warranty: `${1 + idx} years comprehensive`,
          paymentTerms: 'Net 30',
          aiScore: 92 - (idx * 7),
          aiSummary: idx === 0 
            ? 'Outstanding proposal with optimal pricing, fast delivery, and comprehensive coverage.'
            : idx === 1
            ? 'Strong proposal with competitive pricing and extended warranty.'
            : idx === 2
            ? 'Solid proposal with premium warranty terms.'
            : 'Acceptable proposal meeting basic requirements.',
          aiPros: idx === 0
            ? '• Lowest total investment\n• Fastest delivery timeline\n• Strong technical specifications'
            : idx === 1
            ? '• Extended warranty coverage\n• Proven reliability record\n• Strong customer service'
            : idx === 2
            ? '• Premium warranty package\n• Dedicated account manager'
            : '• Meets minimum requirements\n• Basic support package',
          aiCons: idx === 0
            ? '• Standard warranty period\n• Limited customization'
            : idx === 1
            ? '• Higher cost than best offer\n• Longer delivery window'
            : idx === 2
            ? '• Premium pricing\n• Longest delivery time'
            : '• Highest price point\n• Limited support options',
          recommendation: idx === 0 ? 'HIGHLY_RECOMMENDED' : idx === 1 ? 'RECOMMENDED' : idx === 2 ? 'ACCEPTABLE' : 'CONSIDER',
          savings: idx === 0 ? 5000 : idx === 1 ? 1500 : 0,
          specialOffer: idx === 0 ? 'Free 6-month premium support' : idx === 1 ? '10% off next order' : null
        };
      });

      setProposals(mockProposals);
      setLoading(false);
      showNotification('📧 RFP sent! AI-powered proposals received.', 'success');
      setTimeout(() => setActiveTab('compare'), 500);
    }, 2500);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-green-500 to-teal-500';
    if (score >= 75) return 'from-indigo-500 to-violet-500';
    if (score >= 65) return 'from-amber-400 to-orange-500';
    return 'from-rose-500 to-pink-500';
  };

  const getScoreBadge = (score) => {
    if (score >= 85) return { label: 'Excellent', color: 'bg-green-100 text-green-800 border-green-300' };
    if (score >= 75) return { label: 'Very Good', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
    if (score >= 65) return { label: 'Good', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { label: 'Fair', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  const getRecommendationBadge = (rec) => {
    const badges = {
      HIGHLY_RECOMMENDED: { icon: '🏆', text: 'Highly Recommended', color: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' },
      RECOMMENDED: { icon: '⭐', text: 'Recommended', color: 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white' },
      ACCEPTABLE: { icon: '✓', text: 'Acceptable', color: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' },
      CONSIDER: { icon: '○', text: 'Consider', color: 'bg-gray-200 text-gray-700' }
    };
    return badges[rec] || badges.CONSIDER;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
            {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl border-2 flex items-center gap-3 backdrop-blur-xl animate-slide-in ${
          notification.type === 'success'
            ? 'bg-green-500/90 border-green-400 text-white'
            : notification.type === 'error'
            ? 'bg-red-500/90 border-red-400 text-white'
            : 'bg-blue-500/90 border-blue-400 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-lg">{notification.message}</span>
        </div>
      )}

      <div className="relative">
        {/* Premium Header */}
        <div className="bg-white/20 backdrop-blur-2xl border-white/30 shadow-2xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 shadow-2xl rounded-2xl">
                    <Sparkles className="text-white" size={36} />
                  </div>
                </div>

                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                    RFP Intelligence Suite
                  </h1>
                  <p className="text-gray-300 text-sm mt-2 font-medium">
                    AI-Powered Procurement Excellence
                  </p>
                </div>
              </div>

              {structuredRFP && (
                <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-xs font-semibold opacity-90">Active RFP</div>
                  <div className="text-lg font-bold">${structuredRFP.budget?.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Tab Navigation */}
        <div className="max-w-7xl mx-auto px-8 mt-10">
          <div className="flex gap-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl p-3">
            {[
              { id: 'create', label: 'Create RFP', icon: FileText, gradient: 'from-indigo-500 to-blue-500' },
              { id: 'vendors', label: 'Select Vendors', icon: Users, gradient: 'from-fuchsia-500 to-pink-500', disabled: !structuredRFP },
              { id: 'compare', label: 'AI Comparison', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500', disabled: proposals.length === 0 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  disabled={tab.disabled}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl transform scale-105`
                      : tab.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-200 hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <Icon size={24} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-8 py-10">

          {/* CREATE RFP TAB */}
          {activeTab === 'create' && (
            <div className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
                  <Sparkles className="text-indigo-600" size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">AI-Powered RFP Creation</h2>
                  <p className="text-gray-300 mt-1">Describe your needs in plain English - AI does the rest</p>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wide">
                  📝 Your Procurement Requirements
                </label>

                <textarea
                  value={rfpInput}
                  onChange={(e) => setRfpInput(e.target.value)}
                  placeholder="Example: I need 20 high-performance laptops with 16GB RAM..."
                  className="w-full h-48 px-6 py-5 border-2 border-gray-500/30 bg-white/10 rounded-2xl focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-200/20 text-white text-lg leading-relaxed resize-none"
                />

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <Zap size={16} className="text-yellow-400" />
                  <span>AI will automatically extract items, quantities, budget, timeline, and more.</span>
                </div>
              </div>
                            <button
                onClick={handleCreateRFP}
                disabled={!rfpInput || loading}
                className="group relative w-full px-10 py-6 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-xl hover:scale-105 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative flex items-center justify-center gap-4">
                  {loading ? (
                    <>
                      <div className="animate-spin h-7 w-7 border-4 border-white border-t-transparent rounded-full"></div>
                      <span>AI Processing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      <span>Generate Structured RFP</span>
                      <ArrowRight size={24} />
                    </>
                  )}
                </div>
              </button>

              {/* Structured RFP Output */}
              {structuredRFP && (
                <div className="mt-10 p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-200">
                  <div className="flex items-center gap-4 mb-6">
                    <CheckCircle className="text-green-600" size={32} />
                    <h3 className="text-2xl font-black text-green-800">RFP Successfully Created! 🎉</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6 bg-white/10 backdrop-blur-xl p-8 rounded-2xl">
                    <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                      <div className="text-xs font-bold text-indigo-600 mb-1 uppercase">Project Title</div>
                      <div className="text-xl font-black text-gray-900">{structuredRFP.title}</div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl">
                      <div className="text-xs font-bold text-green-600 mb-1 uppercase">Budget</div>
                      <div className="text-xl font-black text-gray-900">
                        ${structuredRFP.budget.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-purple-50 to-fuchsia-100 rounded-xl">
                      <div className="text-xs font-bold text-purple-600 mb-1 uppercase">Delivery Deadline</div>
                      <div className="text-xl font-black text-gray-900">{structuredRFP.deliveryDeadline}</div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl">
                      <div className="text-xs font-bold text-pink-600 mb-1 uppercase">Payment Terms</div>
                      <div className="text-xl font-black text-gray-900">{structuredRFP.paymentTerms}</div>
                    </div>

                    <div className="col-span-2 mt-4 bg-orange-50 p-5 rounded-xl">
                      <div className="text-xs font-bold text-orange-600 mb-2 uppercase">Required Items</div>
                      <div className="space-y-3">
                        {structuredRFP.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-white p-4 rounded-xl shadow"
                          >
                            <div className="p-2 bg-orange-200 rounded-lg">
                              <FileText size={20} className="text-orange-700" />
                            </div>
                            <div className="flex-1">
                              <span className="font-black">{item.quantity}x {item.type}</span>
                              <span className="text-gray-600 ml-2">• {item.specs}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --------------------------- */}
          {/* VENDORS TAB */}
          {/* --------------------------- */}

          {activeTab === 'vendors' && (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-10">
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                    <Users className="text-purple-600" size={32} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-white">Select Trusted Vendors</h2>
                    <p className="text-gray-300 mt-1">Choose from approved vendor partners</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-300">Selected</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {selectedVendors.length}
                  </div>
                </div>
              </div>

              {/* Vendor Cards Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {vendors.map(vendor => {
                  const isSelected = selectedVendors.includes(vendor.id);

                  return (
                    <div
                      key={vendor.id}
                      onClick={() =>
                        setSelectedVendors(prev =>
                          prev.includes(vendor.id)
                            ? prev.filter(id => id !== vendor.id)
                            : [...prev, vendor.id]
                        )
                      }
                      className={`relative p-6 rounded-2xl cursor-pointer transition-all border 
                        ${isSelected
                          ? 'border-fuchsia-400 bg-gradient-to-br from-fuchsia-50 to-pink-50 shadow-xl scale-105'
                          : 'border-gray-300 bg-white/10 backdrop-blur-lg hover:border-fuchsia-300 hover:scale-105 shadow-lg'
                        }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-3 -right-3 p-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full shadow-xl">
                          <CheckCircle size={22} className="text-white" />
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center 
                          ${isSelected ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white' : 'border-gray-300'}`}>
                          {isSelected && <CheckCircle size={20} />}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-black text-white">{vendor.name}</h3>

                          <div className="flex items-center gap-2 mt-2">
                            <Star size={16} className="text-yellow-400" />
                            <span className="font-bold text-white">{vendor.rating}</span>
                            <span className="text-gray-300 text-sm">• {vendor.deals} deals</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail size={16} />
                        <span>{vendor.email}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SEND BUTTON */}
              <button
                onClick={handleSendRFP}
                disabled={loading || selectedVendors.length === 0}
                className="w-full px-10 py-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-xl shadow-xl hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-3 justify-center">
                    <div className="animate-spin h-7 w-7 border-3 border-white border-t-transparent rounded-full"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 justify-center">
                    <Send size={24} />
                    Send RFP to {selectedVendors.length} Vendor(s)
                    <ArrowRight size={24} />
                  </div>
                )}
              </button>
            </div>
          )}
                    {/* ---------------------------------------- */}
          {/* COMPARE TAB */}
          {/* ---------------------------------------- */}

          {activeTab === 'compare' && proposals.length > 0 && (
            <div className="space-y-10">

              {/* AI Recommendation Card */}
              <div className="relative bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-pink-600 text-white p-10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                  <Award size={200} />
                </div>

                <div className="relative">
                  <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                    <Award size={36} /> AI-Powered Recommendation
                  </h2>

                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-80 mb-2">RECOMMENDED VENDOR</div>

                        <div className="text-4xl font-black mb-2">
                          {proposals[0].vendorName}
                        </div>

                        <div className="text-2xl font-bold text-yellow-300">
                          ${proposals[0].totalPrice.toLocaleString()}
                          {proposals[0].savings > 0 && (
                            <span className="ml-3 text-green-300 text-lg">
                              Save ${proposals[0].savings.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {proposals[0].specialOffer && (
                          <div className="mt-3 inline-block px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full font-bold text-sm">
                            🎁 {proposals[0].specialOffer}
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className={`inline-block px-6 py-3 rounded-2xl text-3xl font-black bg-gradient-to-r ${getScoreColor(proposals[0].aiScore)} shadow-xl`}>
                          {proposals[0].aiScore}
                        </div>
                        <div className="text-sm mt-2 opacity-80">AI Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------ */}
              {/* PROPOSALS LIST */}
              {/* ------------------------------------------------ */}

              {proposals.map((proposal, idx) => {
                const badge = getRecommendationBadge(proposal.recommendation);
                const scoreBadge = getScoreBadge(proposal.aiScore);

                return (
                  <div
                    key={proposal.id}
                    className={`bg-white/10 backdrop-blur-xl border rounded-3xl p-10 shadow-xl transition hover:shadow-2xl
                      ${idx === 0 ? 'border-yellow-400' : 'border-gray-300'}`}
                  >
                    {/* Ribbon */}
                    {idx === 0 && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-black text-sm shadow-xl">
                        🏆 BEST CHOICE
                      </div>
                    )}

                    {/* Vendor & Pricing */}
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-3xl font-black text-white flex items-center gap-3">
                          {proposal.vendorName}
                          <span className="px-3 py-1 bg-yellow-300 text-yellow-900 rounded-full flex items-center gap-1 text-sm font-bold">
                            <Star size={16} className="text-yellow-700" />
                            {proposal.vendorRating}
                          </span>
                        </h3>

                        <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                          ${proposal.totalPrice.toLocaleString()}
                        </div>

                        {proposal.savings > 0 && (
                          <div className="mt-2 flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold w-fit">
                            <TrendingDown size={16} className="text-green-600" />
                            Save ${proposal.savings.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className={`inline-block px-6 py-3 rounded-xl border ${scoreBadge.color} font-black text-xl`}>
                          {scoreBadge.label}
                        </div>

                        <div className={`inline-block mt-3 px-6 py-3 rounded-xl bg-gradient-to-r ${getScoreColor(proposal.aiScore)} text-white text-3xl font-black shadow-xl`}>
                          {proposal.aiScore}
                        </div>

                        <div className="text-gray-300 text-sm mt-1">AI Score</div>
                      </div>
                    </div>

                    {/* AI Summary, Pros & Cons */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border">
                        <h4 className="font-black text-white text-lg mb-2">📌 AI Summary</h4>
                        <p className="text-gray-200 whitespace-pre-line">{proposal.aiSummary}</p>
                      </div>

                      <div className="space-y-6">
                        {/* PROS */}
                        <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
                          <h4 className="text-green-800 font-black flex items-center gap-2">
                            <CheckCircle size={18} /> Pros
                          </h4>
                          <p className="text-green-900 text-sm whitespace-pre-line">{proposal.aiPros}</p>
                        </div>

                        {/* CONS */}
                        <div className="bg-red-50 p-5 rounded-2xl border border-red-200">
                          <h4 className="text-red-800 font-black flex items-center gap-2">
                            <AlertCircle size={18} /> Cons
                          </h4>
                          <p className="text-red-900 text-sm whitespace-pre-line">{proposal.aiCons}</p>
                        </div>
                      </div>
                    </div>

                    {/* Item Pricing */}
                    <div className="mt-10">
                      <h4 className="text-xl font-black text-white mb-4">📦 Itemized Pricing</h4>

                      <div className="space-y-3">
                        {proposal.itemPrices.map((item, idx2) => (
                          <div key={idx2} className="flex justify-between bg-white/10 backdrop-blur-xl p-4 rounded-xl border">
                            <span className="font-bold text-white">{item.item}</span>
                            <span className="text-gray-300">{item.qty} units</span>
                            <span className="font-black text-white">${item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="grid grid-cols-3 gap-6 mt-10">
                      <div className="bg-blue-50 p-5 rounded-xl border">
                        <h4 className="font-black text-blue-800 mb-2">⏳ Delivery Time</h4>
                        <p className="text-blue-900">{proposal.deliveryTime}</p>
                      </div>

                      <div className="bg-purple-50 p-5 rounded-xl border">
                        <h4 className="font-black text-purple-800 mb-2">🛡 Warranty</h4>
                        <p className="text-purple-900">{proposal.warranty}</p>
                      </div>

                      <div className="bg-yellow-50 p-5 rounded-xl border">
                        <h4 className="font-black text-yellow-800 mb-2">💰 Payment Terms</h4>
                        <p className="text-yellow-900">{proposal.paymentTerms}</p>
                      </div>
                    </div>

                    {/* Recommendation Badge */}
                    <div className="mt-8 flex justify-end">
                      <div className={`px-6 py-3 rounded-full font-black shadow-xl text-sm ${badge.color}`}>
                        {badge.icon} {badge.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




